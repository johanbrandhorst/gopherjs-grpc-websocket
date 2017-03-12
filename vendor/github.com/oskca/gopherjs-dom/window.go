package dom

import "github.com/gopherjs/gopherjs/js"

// Win The window object represents a window containing a DOM document; the document property points to the DOM document loaded in that window. A window for a given document can be obtained using the document.defaultView property.
type Win struct {
	*EventTarget
	ApplicationCache *js.Object `js:"applicationCache  "` // Window.applicationCache  Read only An OfflineResourceList object providing access to the offline resources for the window.
	Closed           bool       `js:"closed "`            // Window.closed Read only This property indicates whether the current window is closed or not.
	Components       *js.Object `js:"Components  "`       // Window.Components  The entry point to many XPCOM features. Some properties, e.g. classes, are only available to sufficiently privileged code. Web code should not use this property.
	Console          *js.Object `js:"console "`           // Window.console Read only Returns a reference to the console object which provides access to the browser's debugging console.
	Content          *Element   `js:"content "`           // Window.content and Window._content  Read only Returns a reference to the content element in the current window. The obsolete variant with underscore is no longer available from Web content.
	Controllers      *js.Object `js:"controllers "`       // Window.controllers Read only Returns the XUL controller objects for the current chrome window.
	Crypto           *js.Object `js:"crypto "`            // Window.crypto Read only Returns the browser crypto object.
	// DefaultStatus            string     `js:"defaultStatus "`         // Window.defaultStatus Obsolete since Gecko 23 Gets/sets the status bar text for the given window.
	DevicePixelRatio float64      `js:"devicePixelRatio "` // Window.devicePixelRatio Read only Returns the ratio between physical pixels and device independent pixels in the current display.
	DialogArguments  int          `js:"dialogArguments "`  // Window.dialogArguments Read only Gets the arguments passed to the window (if it's a dialog box) at the time window.showModalDialog() was called. This is an nsIArray.
	Directories      *js.Object   `js:"directories  "`     // Window.directories  Synonym of window.personalbar
	Document         *Doc         `js:"document "`         // Window.document Read only Returns a reference to the document that the window contains.
	FrameElement     *Element     `js:"frameElement "`     // Window.frameElement Read only Returns the element in which the window is embedded, or null if the window is not embedded.
	Frames           []*js.Object `js:"frames "`           // Window.frames Read only Returns an array of the subframes in the current window.
	FullScreen       bool         `js:"fullScreen "`       // Window.fullScreen This property indicates whether the window is displayed in full screen or not.
	GlobalStorage    *js.Object   `js:"globalStorage  "`   // Window.globalStorage  Obsolete since Gecko 13 Unsupported since Gecko 13 (Firefox 13). Use Window.localStorage instead. Was: Multiple storage objects that are used for storing data across multiple pages.
	History          *js.Object   `js:"history "`          // Window.history Read only Returns a reference to the history object.
	InnerHeight      int          `js:"innerHeight "`      // Window.innerHeight Gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar.
	InnerWidth       int          `js:"innerWidth "`       // Window.innerWidth Gets the width of the content area of the browser window including, if rendered, the vertical scrollbar.
	IsSecureContext  bool         `js:"isSecureContext "`  // Window.isSecureContext Read only Indicates whether a context is capable of using features that require secure contexts.
	Length           int          `js:"length "`           // Window.length Read only Returns the number of frames in the window. See also window.frames.
	Location         *js.Object   `js:"location "`         // Window.location Read only Gets/sets the location, or current URL, of the window object.
	Locationbar      *js.Object   `js:"locationbar "`      // Window.locationbar Read only Returns the locationbar object, whose visibility can be toggled in the window.
	LocalStorage     *js.Object   `js:"localStorage "`     // Window.localStorage Read only Returns a reference to the local storage object used to store data that may only be accessed by the origin that created it.
	Menubar          *js.Object   `js:"menubar "`          // Window.menubar Read only Returns the menubar object, whose visibility can be toggled in the window.
	MessageManager   *js.Object   `js:"messageManager "`   // Window.messageManager Returns the message manager object for this window.
	// MozAnimationStartTime    string       `js:"mozAnimationStartTime "` // Window.mozAnimationStartTime Read only The time in milliseconds since epoch at which the current animation cycle began.
	// MozInnerScreenX          string       `js:"mozInnerScreenX "`       // Window.mozInnerScreenX Read only Returns the horizontal (X) coordinate of the top-left corner of the window's viewport, in screen coordinates. This value is reported in CSS pixels. See mozScreenPixelsPerCSSPixel in nsIDOMWindowUtils for a conversion factor to adapt to screen pixels if needed.
	// MozInnerScreenY          string `js:"mozInnerScreenY "`   // Window.mozInnerScreenY Read only   Returns the vertical (Y) coordinate of the top-left corner of the window's viewport, in screen coordinates. This value is reported in CSS pixels. See mozScreenPixelsPerCSSPixel for a conversion factor to adapt to screen pixels if needed.
	// MozPaintCount            string `js:"mozPaintCount "`     // Window.mozPaintCount Read only Returns the number of times the current document has been rendered to the screen in this window. This can be used to compute rendering performance.
	Name            string     `js:"name "`            // Window.name Gets/sets the name of the window.
	Navigator       *js.Object `js:"navigator "`       // Window.navigator Read only Returns a reference to the navigator object.
	Opener          *Win       `js:"opener "`          // Window.opener Returns a reference to the window that opened this current window.
	Orientation     float64    `js:"orientation "`     // Window.orientation Read only Returns the orientation in degrees (in 90 degree increments) of the viewport relative to the device's natural orientation.
	OuterHeight     int        `js:"outerHeight "`     // Window.outerHeight Read only Gets the height of the outside of the browser window.
	OuterWidth      int        `js:"outerWidth "`      // Window.outerWidth Read only Gets the width of the outside of the browser window.
	PageXOffset     int        `js:"pageXOffset "`     // Window.pageXOffset Read only An alias for window.scrollX.
	PageYOffsetRead int        `js:"pageYOffsetRead "` // Window.pageYOffsetRead only An alias for window.scrollY
	SessionStorage  *js.Object `js:"sessionStorage "`  // Window.sessionStorage Read only Returns a reference to the session storage object used to store data that may only be accessed by the origin that created it.
	Parent          *Win       `js:"parent "`          // Window.parent Read only Returns a reference to the parent of the current window or subframe.
	Performance     *js.Object `js:"performance "`     // Window.performance Read only Provides a hosting area for performance related attributes.
	Personalbar     *js.Object `js:"personalbar "`     // Window.personalbar Read only Returns the personalbar object, whose visibility can be toggled in the window.
	// Pkcs11                   string     `js:"pkcs11 "`            // Window.pkcs11 Obsolete since Gecko 29 Formerly provided access to install and remove PKCS11 modules.
	ReturnValue     *js.Object `js:"returnValue "`     // Window.returnValue The return value to be returned to the function that called window.showModalDialog() to display the window as a modal dialog.
	Screen          *js.Object `js:"screen "`          // Window.screen Read only Returns a reference to the screen object associated with the window.
	ScreenX         int        `js:"screenX "`         // Window.screenX Read only Returns the horizontal distance of the left border of the user's browser from the left side of the screen.
	ScreenY         int        `js:"screenY "`         // Window.screenY Read only Returns the vertical distance of the top border of the user's browser from the top side of the screen.
	Scrollbars      *js.Object `js:"scrollbars "`      // Window.scrollbars Read only Returns the scrollbars object, whose visibility can be toggled in the window.
	ScrollMaxX      int        `js:"scrollMaxX "`      // Window.scrollMaxX Read only The maximum offset that the window can be scrolled to horizontally, that is the document width minus the viewport width.
	ScrollMaxY      int        `js:"scrollMaxY "`      // Window.scrollMaxY Read only The maximum offset that the window can be scrolled to vertically (i.e., the document height minus the viewport height).
	ScrollX         int        `js:"scrollX "`         // Window.scrollX Read only Returns the number of pixels that the document has already been scrolled horizontally.
	ScrollY         int        `js:"scrollY "`         // Window.scrollY Read only Returns the number of pixels that the document has already been scrolled vertically.
	Self            *js.Object `js:"self "`            // Window.self Read only Returns an object reference to the window object itself.
	Sidebar         *js.Object `js:"sidebar "`         // Window.sidebar Read only Returns a reference to the window object of the sidebar.
	SpeechSynthesis *js.Object `js:"speechSynthesis "` // Window.speechSynthesis Read only Returns a SpeechSynthesis object, which is the entry point into using Web Speech API speech synthesis functionality.
	Status          *js.Object `js:"status "`          // Window.status Gets/sets the text in the statusbar at the bottom of the browser.
	Statusbar       *js.Object `js:"statusbar "`       // Window.statusbar Read only Returns the statusbar object, whose visibility can be toggled in the window.
	Toolbar         *js.Object `js:"toolbar "`         // Window.toolbar Read only Returns the toolbar object, whose visibility can be toggled in the window.
	Top             *Win       `js:"top "`             // Window.top Read only Returns a reference to the topmost window in the window hierarchy. This property is read only.
	Window          *Win       `js:"window "`          // Window.window Read only Returns a reference to the current window.

	Alert              func(msg string) `js:"alert"`              // Window.alert() Displays an alert dialog.
	Back               func()           `js:"back"`               // Window.back()   Moves back one in the window history.
	Blur               func()           `js:"blur"`               // Window.blur() Sets focus away from the window.
	CancelIdleCallback func()           `js:"cancelIdleCallback"` // Window.cancelIdleCallback()  Enables you to cancel a callback previously scheduled with Window.requestIdleCallback.
	CaptureEvents      func()           `js:"captureEvents"`      // Window.captureEvents()  Registers the window to capture all events of the specified type.
	ClearImmediate     func()           `js:"clearImmediate"`     // Window.clearImmediate() Cancels the repeated execution set using setImmediate.
	Close              func()           `js:"close"`              // Window.close() Closes the current window.
	Confirm            func(msg string) `js:"confirm"`            // Window.confirm() Displays a dialog with a message that the user needs to respond to.

	// DisableExternalCapture func() `js:"disableExternalCapture"` // Window.disableExternalCapture() Obsolete since Gecko 24 FIXME: NeedsContents
	DispatchEvent         func() `js:"dispatchEvent"`         // Window.dispatchEvent() Used to trigger an event.
	Dump                  func() `js:"dump"`                  // Window.dump() Writes a message to the console.
	EnableExternalCapture func() `js:"enableExternalCapture"` // Window.enableExternalCapture() Obsolete since Gecko 24 FIXME: NeedsContents
	Find                  func() `js:"find"`                  // Window.find() Searches for a given string in a window.
	Focus                 func() `js:"focus"`                 // Window.focus() Sets focus on the current window.
	Forward               func() `js:"forward"`               // Window.forward()   Moves the window one document forward in the history.
	GetAttention          func() `js:"getAttention"`          // Window.getAttention() Flashes the application icon.

	GetAttentionWithCycleCount func() `js:"getAttentionWithCycleCount"` // Window.getAttentionWithCycleCount() FIXME: NeedsContents

	GetComputedStyle        func() `js:"getComputedStyle"`        // Window.getComputedStyle() Gets computed style for the specified element. Computed style indicates the computed values of all CSS properties of the element.
	GetDefaultComputedStyle func() `js:"getDefaultComputedStyle"` // Window.getDefaultComputedStyle()  Gets default computed style for the specified element, ignoring author stylesheets.
	GetSelection            func() `js:"getSelection"`            // Window.getSelection() Returns the selection object representing the selected item(s).
	Home                    func() `js:"home"`                    // Window.home()   Returns the browser to the home page.
	MatchMedia              func() `js:"matchMedia"`              // Window.matchMedia() Returns a MediaQueryList object representing the specified media query string.
	Maximize                func() `js:"maximize"`                // Window.maximize() FIXME: NeedsContents
	Minimize                func() `js:"minimize"`                // Window.minimize() (top-level XUL windows only) Minimizes the window.
	MoveBy                  func() `js:"moveBy"`                  // Window.moveBy() Moves the current window by a specified amount.
	MoveTo                  func() `js:"moveTo"`                  // Window.moveTo() Moves the window to the specified coordinates.

	MozRequestAnimationFrame func() `js:"mozRequestAnimationFrame"` // Window.mozRequestAnimationFrame() Tells the browser that an animation is in progress, requesting that the browser schedule a repaint of the window for the next animation frame. This will cause a MozBeforePaint event to fire before that repaint occurs.

	Open                        func(url string) *js.Object `js:"open"`                           // Window.open() Opens a new window.
	OpenDialog                  func()                      `js:"openDialog"`                     // Window.openDialog() Opens a new dialog window.
	PostMessage                 func()                      `js:"postMessage"`                    // Window.postMessage() Provides a secure means for one window to send a string of data to another window, which need not be within the same domain as the first.
	Print                       func()                      `js:"print"`                          // Window.print() Opens the Print Dialog to print the current document.
	Prompt                      func()                      `js:"prompt"`                         // Window.prompt() Returns the text entered by the user in a prompt dialog.
	ReleaseEvents               func()                      `js:"releaseEvents"`                  // Window.releaseEvents()  Releases the window from trapping events of a specific type.
	RequestIdleCallback         func()                      `js:"requestIdleCallback"`            // Window.requestIdleCallback()   Enables the scheduling of tasks during a browser's idle periods.
	ResizeBy                    func()                      `js:"resizeBy"`                       // Window.resizeBy() Resizes the current window by a certain amount.
	ResizeTo                    func()                      `js:"resizeTo"`                       // Window.resizeTo() Dynamically resizes window.
	Restore                     func()                      `js:"restore"`                        // Window.restore() FIXME: NeedsContents
	RouteEvent                  func()                      `js:"routeEvent"`                     // Window.routeEvent() Obsolete since Gecko 24 FIXME: NeedsContents
	Scroll                      func()                      `js:"scroll"`                         // Window.scroll() Scrolls the window to a particular place in the document.
	ScrollBy                    func()                      `js:"scrollBy"`                       // Window.scrollBy() Scrolls the document in the window by the given amount.
	ScrollByLines               func()                      `js:"scrollByLines"`                  // Window.scrollByLines() Scrolls the document by the given number of lines.
	ScrollByPages               func()                      `js:"scrollByPages"`                  // Window.scrollByPages() Scrolls the current document by the specified number of pages.
	ScrollTo                    func()                      `js:"scrollTo"`                       // Window.scrollTo() Scrolls to a particular set of coordinates in the document.
	SetCursor                   func()                      `js:"setCursor"`                      // Window.setCursor() Changes the cursor for the current window
	SetImmediate                func()                      `js:"setImmediate"`                   // Window.setImmediate() Executes a function after the browser has finished other heavy tasks
	SetResizable                func()                      `js:"setResizable"`                   // Window.setResizable() Toggles a user's ability to resize a window.
	ShowModalDialog             func()                      `js:"showModalDialog"`                // Window.showModalDialog() Displays a modal dialog.
	SizeToContent               func()                      `js:"sizeToContent"`                  // Window.sizeToContent() Sizes the window according to its content.
	Stop                        func()                      `js:"stop"`                           // Window.stop() This method stops window loading.
	UpdateCommands              func()                      `js:"updateCommands"`                 // Window.updateCommands() Updates the state of commands of the current chrome window (UI).
	Ondevicelight               func()                      `js:"ondevicelight "`                 // Window.ondevicelight An event handler property for any ambient light levels changes
	Ondevicemotion              func()                      `js:"ondevicemotion "`                // Window.ondevicemotion Called if accelerometer detects a change (For mobile devices)
	Ondeviceorientation         func()                      `js:"ondeviceorientation "`           // Window.ondeviceorientation Called when the orientation is changed (For mobile devices)
	Ondeviceorientationabsolute func()                      `js:"ondeviceorientationabsolute   "` // Window.ondeviceorientationabsolute   Chrome only An event handler property for any device orientation changes.
	Ondeviceproximity           func()                      `js:"ondeviceproximity "`             // Window.ondeviceproximity An event handler property for device proximity event
	Onappinstalled              func()                      `js:"onappinstalled "`                // Window.onappinstalled Called when the page is installed as a webapp. See appinstalled event.
	Oninput                     func()                      `js:"oninput "`                       // Window.oninput Called when the value of an <input> element changes
	Onpaint                     func()                      `js:"onpaint "`                       // Window.onpaint An event handler property for paint events on the window.
	Onrejectionhandled          func()                      `js:"onrejectionhandled  "`           // Window.onrejectionhandled  An event handler for handled Promise rejection events.
	Onuserproximity             func()                      `js:"onuserproximity "`               // Window.onuserproximity An event handler property for user proximity events.
	Onvrdisplayconnected        func()                      `js:"onvrdisplayconnected  "`         // Window.onvrdisplayconnected  Represents an event handler that will run when a compatible VR device has been connected to the computer (when the vrdisplayconnected event fires).
	Onvrdisplaydisconnected     func()                      `js:"onvrdisplaydisconnected  "`      // Window.onvrdisplaydisconnected  Represents an event handler that will run when a compatible VR device has been disconnected from the computer (when the vrdisplaydisconnected event fires).
	Onvrdisplaypresentchange    func()                      `js:"onvrdisplaypresentchange  "`     // Window.onvrdisplaypresentchange  represents an event handler that will run when the presenting state of a VR device changes — i.e. goes from presenting to not presenting, or vice versa (when the onvrdisplaypresentchange event fires).
}

func WrapWindow(o *js.Object) *Win {
	return &Win{
		EventTarget: WrapEventTarget(o),
	}
}
