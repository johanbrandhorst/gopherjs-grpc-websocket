#!/usr/bin/env python3

import json
import os
import subprocess
import logging
import argparse

GOPATH_SRC = os.path.join(os.environ['GOPATH'], 'src')


def delete_generated_files(proto_root):
    '''
    Delete all generated files below the current directory.
    '''
    generated_file_exts = [
        '.pb.go', '.pb.gw.go', '.swagger.json',
    ]
    for root, dirs, filenames in os.walk(proto_root):
        for filename in filenames:
            if any(ext in filename for ext in generated_file_exts):
                filepath = os.path.join(root, filename)
                logging.debug('Deleting {}'.format(filepath))
                os.unlink(filepath)


def get_includes(package):
    '''
    Returns the includes used with protoc, in order of preference.
    It is important to keep the 'global' searches at the bottom, to
    ensure the correct version is used if there are duplicates.
    '''
    return [
        '-I/usr/local/include',
        '-I./',
        '-I./vendor/github.com/googleapis/googleapis/',
        '-I./vendor/',
        '-I' + GOPATH_SRC,
    ]


def run_command(cmd):
    '''
    Run a command in a subprocess.
    '''
    logging.debug('Running:\n\t{}'.format(' '.join(cmd)))
    try:
        logging.debug(
            subprocess.check_output(
                cmd, stderr=subprocess.STDOUT).decode())
    except subprocess.CalledProcessError as e:
        logging.warn(e.output.decode())
        raise e


def run_protoc(proto_root, package, compilers):
    '''
    Helper to run protoc with appropriate parameters.
    '''
    cmd = ['protoc', '{0}/{1}/{1}.proto'.format(proto_root, package)]
    cmd += compilers
    cmd += get_includes(package)
    run_command(cmd)


def build_service(proto_root, package):
    '''
    Build a service, with the grpc-plugin for the --go_out
    compiler, as well as the --grpc-gateway_out and --gopherjs_out compilers.
    '''

    go_out_params = ['plugins=grpc', ]
    grpc_gateway_out_params = ['logtostderr=true', ]
    gopherjs_out_params = []

    compilers = [
        '--go_out={}:{}'.format(','.join(go_out_params), GOPATH_SRC),
        '--grpc-gateway_out={}:./'.format(','.join(grpc_gateway_out_params)),
        '--gopherjs_out={}:./client/'.format(','.join(gopherjs_out_params)),
    ]

    run_protoc(proto_root, package, compilers)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--level', default='INFO', type=str.lower, choices=['info', 'debug'])
    args = parser.parse_args()
    logging.basicConfig(
        level={
            'info': logging.INFO,
            'debug': logging.DEBUG,
        }[args.level],
        format='%(message)s', )

    proto_root = './protos'

    # Delete old files so that it's obvious if we've broken
    # the output of protoc.
    delete_generated_files(proto_root)

    build_service(proto_root, 'server')


if __name__ == '__main__':
    main()
