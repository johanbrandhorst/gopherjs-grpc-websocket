#!/usr/bin/env python3

import json
import os
import subprocess
import logging
import argparse
import shlex

GOOGLE_APIS_PATH = ('github.com/grpc-ecosystem/grpc-gateway/'
                    'third_party/googleapis/')
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


def alter_swagger_schema(proto_root, package):
    '''
    Set the value of 'schemes' in the <package>.swagger.json
    file to just 'https'.
    '''
    swagger_path = os.path.join(proto_root, package, package + '.swagger.json')

    with open(swagger_path, 'r') as f:
        j = json.load(f)

    j['schemes'] = ['https']

    with open(swagger_path, 'w') as f:
        json.dump(obj=j, fp=f, sort_keys=True, indent=4)


def get_includes(package):
    '''
    Returns the includes used with protoc, in order of preference.
    It is important to keep the 'global' searches at the bottom, to
    ensure the correct version is used if there are duplicates.
    '''
    return [
        '-I/usr/local/include',
        '-I./',
        '-I./vendor/' + GOOGLE_APIS_PATH,
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
    compiler, as well as the --grpc-gateway_out and --swagger_out compilers.
    '''
    replaced_imports = {
        'google/api/annotations.proto': GOOGLE_APIS_PATH + 'google/api',
    }

    go_out_params = ['plugins=grpc', ]
    grpc_gateway_out_params = ['logtostderr=true', ]

    for old_import, new_import in replaced_imports.items():
        go_out_params.append('M{}={}'.format(old_import, new_import))
        grpc_gateway_out_params.append('M{}={}'.format(old_import, new_import))

    compilers = [
        '--go_out={}:{}'.format(','.join(go_out_params), GOPATH_SRC),
        '--grpc-gateway_out={}:./'.format(','.join(grpc_gateway_out_params)),
        '--swagger_out={}:./'.format(','.join(grpc_gateway_out_params)),
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
    alter_swagger_schema(proto_root, 'server')


if __name__ == '__main__':
    main()
