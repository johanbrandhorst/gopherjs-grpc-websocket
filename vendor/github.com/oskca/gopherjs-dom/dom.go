// Package dom is a thin wrapper of some useful dom functions for gopherjs.
package dom

import (
	"github.com/gopherjs/gopherjs/js"
)

const (
	// Wheel Delta
	DeltaPixel = 0
	DeltaLine  = 1
	DeltaPage  = 2

	// Event Phase
	EvPhaseNone      = 0
	EvPhaseCapturing = 1
	EvPhaseAtTarget  = 2
	EvPhaseBubbling  = 3
)

// Events Types
const (
	// Window Event Attributes
	// Window Events triggered for a window object and apply in <body> tag
	// Attributes	Value	Description	In HTML5?
	EvtAfterprint       = "afterprint"       //	Script is run after the document is printed	NEW
	EvtBeforeprint      = "beforeprint"      //	Script is run before the document is printed	NEW
	EvtBeforeunload     = "beforeunload"     //	Script is run before the document is unloaded	NEW
	EvtError            = "error"            //	Script is run when any error occur	NEW
	EvtHaschange        = "haschange"        //	Script is run when document has changed	NEW
	EvtLoad             = "load"             //	Event fires after the page loading finished
	EvtDOMContentLoaded = "DOMContentLoaded" // Event fires after the page DOM is ready
	EvtMessage          = "message"          //	Script is run when document goes in offline	NEW
	EvtOffline          = "offline"          //	Script is run when document comes in Event = "line	NEW
	EvtPagehide         = "pagehide"         //	Script is run when document window is hidden	NEW
	EvtPageshow         = "pageshow"         //	Script is run when document window become visible	NEW
	EvtPopstate         = "popstate"         //	Script is run when document window history changes	NEW
	EvtRedo             = "redo"             //	Script is run when document perform redo	NEW
	EvtResize           = "resize"           //	Event fires when browser window is resized	NEW
	EvtStorage          = "storage"          //	Script is run when web storage area is updated	NEW
	EvtUndo             = "undo"             //	Script is run when document performs undo	NEW
	EvtUnload           = "unload"           //	Event fires when browser window has been closed

	// Form Events
	// Form Events triggered by perform some action inside HTML form elements.
	// Attributes	Value	Description	In HTML5?
	EvtBlur        = "blur"        //	Event fire when element loses focus
	EvtChange      = "change"      //	Event fire when element value is changed
	EvtContextmenu = "contextmenu" //	Event fire when context menu is triggered	NEW
	EvtFocus       = "focus"       //	Event fire when element gets focus
	EvtFormchange  = "formchange"  //	Event fire when form changes	NEW
	EvtForminput   = "forminput"   //	Event fire when form get input field
	EvtInput       = "input"       //	Event fire when element get input field	NEW
	EvtInvalid     = "invalid"     //	Event fire when element is invalid	NEW
	EvtReset       = "reset"       //	Event fire when clicked on form reset button	REMOVE
	EvtSelect      = "select"      //	Event fire after allow to select text in an element
	EvtSubmit      = "Submit"      //	Event fire when form is submitted

	// Keyboard Events
	// Attributes	Value	Description	In HTML5?
	EvtKeydown  = "keydown"  //	Event fire when pressing a key
	EvtKeypress = "keypress" //	Event fire when press a key
	EvtKeyup    = "keyup"    //	Event fire when releases a key

	// Mouse Events
	// Mouse Events triggered by mouse action.
	// Attributes	Value	Description	In HTML5?
	EvtClick      = "click"      //	Event fire when mouse click on element
	EvtDblclick   = "dblclick"   //	Event fire when mouse double click on element
	EvtDrag       = "drag"       //	Script is run when element is dragged	NEW
	EvtDragend    = "dragend"    //	Script is run at end of drag operation	NEW
	EvtDragenter  = "dragenter"  //	Script is run when element has dragged to a valid drop target	NEW
	EvtDragleave  = "dragleave"  //	Script is run when element leaves valid drop target	NEW
	EvtDragover   = "dragover"   //	Script is run when element is dragged over on valid drop target	NEW
	EvtDragstart  = "dragstart"  //	Script is run at start of drag operation	NEW
	EvtDrop       = "drop"       //	Script is run when dragged element is dropped	NEW
	EvtMousedown  = "mousedown"  //	Event fire when mouse button is pressed down on element
	EvtMousemove  = "mousemove"  //	Event fire when mouse pointer moves over an element
	EvtMouseout   = "mouseout"   //	Event fire when mouse pointer moves out an element
	EvtMouseover  = "mouseover"  //	Event fire when mouse pointer moves over on element
	EvtMouseup    = "mouseup"    //	Event fire when mouse button is released over an element
	EvtMousewheel = "mousewheel" //	Event fire when mouse wheel being rotated	NEW
	EvtScroll     = "scroll"     //	Event fire when element scrollbar being scrolled	NEW

	// Media Events
	// Media Events triggered by common media elements like <img>, <audio>, <embed>, <object>, and <video>.
	// Attributes	Value	Description	In HTML5?
	EvtAbort            = "abort"            //	Script is run when element is abort
	EvtCanplay          = "canplay"          //	Script is run when file is ready for start playing	NEW
	EvtCanplaythrough   = "canplaythrough"   //	Script is run when file is played all way without pausing for buffering	NEW
	EvtDurationchange   = "durationchange"   //	Script is run when media length changes	NEW
	EvtEmptied          = "emptied"          //	Script is run when something unavailable/disconnects	NEW
	EvtEnded            = "ended"            //	Script is run when media has reach to end position	NEW
	EvtLoadeddata       = "loadeddata"       //	Script is run when media is loaded	NEW
	EvtLoadedmetadata   = "loadedmetadata"   //	Script is run when meta data are loaded	NEW
	EvtLoadstart        = "loadstart"        //	Script is run when file being loaded	NEW
	EvtPause            = "pause"            //	Script is run when media is paused	NEW
	EvtPlay             = "play"             //	Script is run when media is ready to start playing	NEW
	EvtPlaying          = "playing"          //	Script is run when media is actually start for playing	NEW
	EvtProgress         = "progress"         //	Script is run when browser is process of getting media data	NEW
	EvtRatechange       = "ratechange"       //	Script is run when playback rate changes	NEW
	EvtReadystatechange = "readystatechange" //	Script is run when ready state changes for each time	NEW
	EvtSeeked           = "seeked"           //	Script is run when seeking attribute value set to false, that indicate seeking has ended	NEW
	EvtSeeking          = "seeking"          //	Script is run when seeking attribute value set to true, that indicate seeking has active	NEW
	EvtStalled          = "stalled"          //	Script is run when browser is unable to fetch media data for any reason	NEW
	EvtSuspend          = "suspend"          //	Script is run when fetching media data is stopped before it is completely loaded for any reason	NEW
	EvtTimeupdate       = "timeupdate"       //	Script is run when playing position has changed	NEW
	EvtVolumechange     = "volumechange"     //	Script is run each time volume is changed	NEW
	EvtWaiting          = "waiting"          //	Script is run when media has paused(for buffer more data)	NEW
	// onerror            //	Script is run when error occurs file loaded time	NEW

)

type CSSStyleDeclaration struct {
	*js.Object
	// Textual representation of the declaration block. Setting this attribute changes the style.
	CssText string `js:"cssText"`
	// CSSStyleDeclaration.length

	// The number of properties. See the item method below.
	Length int `js:"length"`
	// CSSStyleDeclaration.parentRule

	// The containing CssRule.
	ParentRule *CSSStyleDeclaration `js:"parentRule"`

	// funcs
	RemoveProperty      func(name string)                            `js:"removeProperty"`
	GetPropertyValue    func(name string) string                     `js:"getPropertyValue"`
	GetPropertyPriority func(name string) string                     `js:"getPropertyPriority"`
	SetProperty         func(name, value string, priority ...string) `js:"setProperty"`
}

func (css *CSSStyleDeclaration) ToMap() map[string]string {
	m := make(map[string]string)
	N := css.Length
	for i := 0; i < N; i++ {
		name := css.Call("index", i).String()
		value := css.Call("getPropertyValue").String()
		m[name] = value
	}
	return m
}

func GetComputedStyle(e *Element) *CSSStyleDeclaration {
	return &CSSStyleDeclaration{
		Object: js.Global.Get("document").Get("defaultView").Call("getComputedStyle", e.Object),
	}
}

type EventTarget struct {
	*js.Object
	// Event handling

	// Registers an event handler to a specific event type on the element.
	//   If true, useCapture indicates that the user wishes to initiate capture.
	//   After initiating capture, all events of the specified type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
	//   Events which are bubbling upward through the tree will not trigger a listener designated to use capture.
	AddEventListener    func(eventType string, listener func(*Event), useCapture ...bool) `js:"addEventListener"`
	RemoveEventListener func(eventType string, listener func(*Event), useCapture ...bool) `js:"removeEventListener"`
	DispatchEvent       func(*Event)                                                      `js:"dispatchEvent"`
}

func WrapEventTarget(t *js.Object) *EventTarget {
	return &EventTarget{Object: t}
}

type NodeType int

const (
	ELEMENT_NODE                NodeType = 1
	ATTRIBUTE_NODE                       = 2
	TEXT_NODE                            = 3
	CDATA_SECTION_NODE                   = 4
	ENTITY_REFERENCE_NODE                = 5
	ENTITY_NODE                          = 6
	PROCESSING_INSTRUCTION_NODE          = 7
	COMMENT_NODE                         = 8
	DOCUMENT_NODE                        = 9
	DOCUMENT_TYPE_NODE                   = 10
	DOCUMENT_FRAGMENT_NODE               = 11
	NOTATION_NODE                        = 12
)

type NodeList struct {
	*js.Object
	Length int                `js:"length"`
	Item   func(idx int) Node `js:"item"`
}

type Node struct {
	*EventTarget
	// attrs
	BaseURI         string    `js:"baseURI"`         //	返回节点的绝对基准 URI。	No	1	No	Yes
	ChildNodes      *NodeList `js:"childNodes"`      //	返回节点到子节点的节点列表。	5	1	9	Yes
	FirstChild      *Node     `js:"firstChild"`      //	返回节点的首个子节点。	5	1	9	Yes
	LastChild       *Node     `js:"lastChild"`       //	返回节点的最后一个子节点。	5	1	9	Yes
	LocalName       string    `js:"localName"`       //	返回节点的本地名称。	No	1	9	Yes
	NamespaceURI    string    `js:"namespaceURI"`    //	返回节点的命名空间 URI。	No	1	9	Yes
	NextSibling     *Node     `js:"nextSibling"`     //	返回节点之后紧跟的同级节点。	5	1	9	Yes
	NodeName        string    `js:"nodeName"`        //	返回节点的名称，根据其类型。	5	1	9	Yes
	NodeType        NodeType  `js:"nodeType"`        //	返回节点的类型。	5	1	9	Yes
	NodeValue       string    `js:"nodeValue"`       //	设置或返回节点的值，根据其类型。	5	1	9	Yes
	OwnerDocument   *Doc      `js:"ownerDocument"`   //	返回节点的根元素（document 对象）。	5	1	9	Yes
	ParentNode      *Node     `js:"parentNode"`      //	返回节点的父节点。	5	1	9	Yes
	Prefix          string    `js:"prefix"`          //	设置或返回节点的命名空间前缀。	No	1	9	Yes
	PreviousSibling *Node     `js:"previousSibling"` //	返回节点之前紧跟的同级节点。	5	1	9	Yes
	TextContent     string    `js:"textContent"`     //	设置或返回节点及其后代的文本内容。	No	1	No	Yes
	// Text            string    `js:"text"`            //	返回节点及其后代的文本（IE 独有的属性）。	5	No	No	No
	// Xml             string    `js:"xml"`             //	返回节点及其后代的 XML（IE 独有的属性）。	5	No	No	No

	// methods
	AppendChild             func(*Node)     `js:"appendChild"`             //	向节点的子节点列表的结尾添加新的子节点。	5	1	9	Yes
	CloneNode               func() *Node    `js:"cloneNode"`               //	复制节点。	5	1	9	Yes
	CompareDocumentPosition func(*Node) int `js:"compareDocumentPosition"` //	对比两个节点的文档位置。	No	1	No	Yes
	// GetFeature              func()       `js:"getFeature"`              //eature,version)	返回一个 DOM 对象，此对象可执行带有指定特性和版本的专门的 API。	 	 	No	Yes
	// GetUserData           func() `js:"getUserData"`           //ey)	返回与此节点上的某个键相关联的对象。此对象必须首先通过使用相同的键来调用 setUserData 被设置到此节点。	 	 	No	Yes
	// HasAttributes         func() `js:"hasAttributes"`         //	判断当前节点是否拥有属性。	No	1	9	Yes
	HasChildNodes      func() bool                     `js:"hasChildNodes"`      //	判断当前节点是否拥有子节点。	5	1	9	Yes
	InsertBefore       func(which *Node, before *Node) `js:"insertBefore"`       //	在指定的子节点前插入新的子节点。	5	1	9	Yes
	IsDefaultNamespace func(string) bool               `js:"isDefaultNamespace"` //RI)	返回指定的命名空间 URI 是否为默认。	 	 	No	Yes
	IsEqualNode        func(*Node) bool                `js:"isEqualNode"`        //	检查两个节点是否相等。	No	No	No	Yes
	IsSameNode         func(*Node) bool                `js:"isSameNode"`         //	检查两个节点是否是相同的节点。	No	1	No	Yes
	// IsSupported           func()                          `js:"isSupported"`           //	返回当前节点是否支持某个特性。	 	 	9	Yes
	LookupNamespaceURI func(string) string            `js:"lookupNamespaceURI"` //	返回匹配指定前缀的命名空间 URI。	No	1	No	Yes
	LookupPrefix       func() string                  `js:"lookupPrefix"`       //	返回匹配指定命名空间 URI 的前缀。	No	1	No	Yes
	Normalize          func()                         `js:"normalize"`          //	合并相邻的Text节点并删除空的Text节点。	5	1	9	Yes
	RemoveChild        func(*Node)                    `js:"removeChild"`        //	删除（并返回）当前节点的指定子节点。	5	1	9	Yes
	ReplaceChild       func(newChild, oldChild *Node) `js:"replaceChild"`       //	用新节点替换一个子节点。	5	1	9	Yes
	// SelectNodes           func()                         `js:"selectNodes"`           //	用一个 XPath 表达式查询选择节点。	6
	// SelectSingleNode      func() `js:"selectSingleNode"`      //	查找和 XPath 查询匹配的一个节点。	6
	// TransformNode         func() `js:"transformNode"`         //	使用 XSLT 把一个节点转换为一个字符串。	6
	// TransformNodeToObject func() `js:"transformNodeToObject"` //	使用 XSLT 把一个节点转换为一个文档。	6
	// SetUserData           func() `js:"setUserData"`           //ey,data,handler)	把对象关联到节点上的一个键上。	 	 	No	Yes
}

func WrapNode(n *js.Object) *Node {
	return &Node{
		EventTarget: WrapEventTarget(n),
	}
}

type Doc struct {
	*Node
	CharacterSet    string     `js:"characterSet"`
	Async           bool       `js:"async"`           //	规定 XML 文件的下载是否应当被同步处理。	5	1.5	9	No
	Doctype         *js.Object `js:"doctype"`         //	返回与文档相关的文档类型声明 (DTD)。	6	1	9	Yes
	DocumentElement *Element   `js:"documentElement"` //	返回文档的根节点	5	1	9	Yes
	DocumentURI     string     `js:"documentURI"`     //	设置或返回文档的位置	No	1	9	Yes
	// DomConfig           string     `js:"domConfig"`           //	返回normalizeDocument()被调用时所使用的配置	 	 	No	Yes
	Implementation *js.Object `js:"implementation"` //	返回处理该文档的 DOMImplementation 对象。	No	1	9	Yes
	// InputEncoding       string `js:"inputEncoding"`       //	返回用于文档的编码方式（在解析时）。	No	1	No	Yes
	// StrictErrorChecking string `js:"strictErrorChecking"` //	设置或返回是否强制进行错误检查。	No	1	No	Yes
	// Text          string `js:"text"`          //	返回节点及其后代的文本（仅用于 IE）。	5	No	No	No
	// Xml           string `js:"xml"`           //	返回节点及其后代的 XML（仅用于 IE）。	5	No	No	No
	// XmlEncoding   string `js:"xmlEncoding"`   //	返回文档的编码方法。	No	1	No	Yes
	// XmlStandalone string `js:"xmlStandalone"` //	设置或返回文档是否为 standalone。	No	1	No	Yes
	// XmlVersion    string `js:"xmlVersion"`    //	设置或返回文档的 XML 版本。	No	1	No	Yes

	// methods
	AdoptNode func(*Node) *Node `js:"adoptNode"` // (sourcenode)	从另一个文档向本文档选定一个节点，然后返回被选节点。	 	 	No	Yes
	// CreateAttribute             func()            `js:"createAttribute"`             // (name)	创建拥有指定名称的属性节点，并返回新的 Attr 对象。	6	1	9	Yes
	// CreateAttributeNS           func()            `js:"createAttributeNS"`           // (uri,name)	创建拥有指定名称和命名空间的属性节点，并返回新的 Attr 对象。	 	 	9	Yes
	// CreateCDATASection          func()            `js:"createCDATASection"`          // ()	创建 CDATA 区段节点。	5	1	9	Yes
	CreateComment func(string) *Node `js:"createComment"` // ()	创建注释节点。	6	1	9	Yes
	// CreateDocumentFragment      func()             `js:"createDocumentFragment"`      // ()	创建空的 DocumentFragment 对象，并返回此对象。	5	1	9	Yes
	CreateElement   func(tagName string) *Element         `js:"createElement"`   // ()	创建元素节点。	5	1	9	Yes
	CreateElementNS func(namespace, name string) *Element `js:"createElementNS"` // ()	创建带有指定命名空间的元素节点。	No	1	9	Yes
	CreateEvent     func(etype string) *Event             `js:"createEvent"`     // ()	创建新的 Event 对象。	 	 	 	Yes
	// CreateEntityReference       func()                                `js:"createEntityReference"`       // (name)	创建 EntityReference 对象，并返回此对象。	5	 	No	Yes
	// CreateExpression            func()                                `js:"createExpression"`            // ()	创建一个XPath表达式以供稍后计算。	 	 	 	Yes
	// CreateProcessingInstruction func()                                `js:"createProcessingInstruction"` // ()	创建 ProcessingInstruction 对象，并返回此对象。	5	 	9	Yes
	// CreateRange                 func()                                `js:"createRange"`                 // ()	创建 Range 对象，并返回此对象。	No	 	 	Yes
	// Evaluate               func() `js:"evaluate"`               // ()	计算一个 XPath 表达式。	No	1	9	Yes
	CreateTextNode         func(text string) *Node              `js:"createTextNode"`         // ()	创建文本节点。	5	1	9	Yes
	GetElementById         func(id string) *Element             `js:"getElementById"`         // ()	查找具有指定的唯一 ID 的元素。	5	1	9	Yes
	GetElementsByTagName   func(tag string) *HTMLCollection     `js:"getElementsByTagName"`   // ()	返回所有具有指定名称的元素节点。	5	1	9	Yes
	GetElementsByTagNameNS func(ns, tag string) *HTMLCollection `js:"getElementsByTagNameNS"` // ()	返回所有具有指定名称和命名空间的元素节点。	No	1	9	Yes
	ImportNode             func(node *Node, deep bool) *Node    `js:"importNode"`             // ()	把一个节点从另一个文档复制到该文档以便应用。	 	 	9	Yes
	// LoadXML                func()                               `js:"loadXML"`                // ()	通过解析XML标签字符串来组成文档。
	// NormalizeDocument      func()                               `js:"normalizeDocument"`      // ()	 	 	 	No	Yes
	// RenameNode             func()                               `js:"renameNode"`             // ()	重命名元素或者属性节点。	 	 	No	Yes
	QuerySelector    func(sel string) *Element        `js:"querySelector"`
	QuerySelectorAll func(sel string) *HTMLCollection `js:"querySelectorAll"`
}

func WrapDocument(o *js.Object) *Doc {
	return &Doc{
		Node: WrapNode(o),
	}
}

type Element struct {
	*Node
	// basic attr
	Id              string `js:"id"`
	InnerHTML       string `js:"innerHTML"`
	InnerText       string `js:"innerText"`
	TagName         string `js:"tagName"`
	ContentEditable bool   `js:"contentEditable"`
	// width & height, not all element supoort these attributes,
	// use Style to set width/height
	Width  int `js:"width"`
	Height int `js:"height"`
	// window size, for window object
	InnerWidth  int `js:"innerWidth"`
	InnerHeight int `js:"innerHeight"`
	// dom
	PreviousElementSibling *Element `js:"previousElementSibling"`
	NextElementSibling     *Element `js:"nextElementSibling"`
	FirstElementChild      *Element `js:"firstElementChild"`
	LastElementChild       *Element `js:"lastElementChild"`
	// img, script
	Src string `js:"src"`
	// style
	Style     *CSSStyleDeclaration `js:"style"`
	ClassName string               `js:"className"`
	ClassList []string             `js:"classList"`

	// funcs
	SetAttribute    func(attr string, val interface{}) `js:"setAttribute"`
	GetAttribute    func(attr string) *js.Object       `js:"getAttribute"`
	RemoveAttribute func(attr string)                  `js:"removeAttribute"`

	AppendChild func(child *Element) `js:"appendChild"`
	RemoveChild func(child *Element) `js:"removeChild"`
	Remove      func()               `js:"remove"`

	QuerySelector    func(sel string) *Element        `js:"querySelector"`
	QuerySelectorAll func(sel string) *HTMLCollection `js:"querySelectorAll"`

	Click func() `js:"click"`
}

// func (e *Element) Style() *CSSStyleDeclaration {
// 	return &CSSStyleDeclaration{
// 		Object: e.Get("style"),
// 	}
// }

type HTMLCollection struct {
	*js.Object
	// length Read only
	// Returns the number of items in the collection.
	Length int `js:"length"`
	// HTMLCollection.item(index number)
	// Returns the specific node at the given zero-based index into the list. Returns null if the index is out of range.
	Item func(index int) *Element `js:"item"`
}

func WrapElement(el *js.Object) *Element {
	if el == js.Undefined || el == nil {
		return nil
	}
	return &Element{Node: WrapNode(el)}
}

func Document() *Doc {
	return WrapDocument(js.Global.Get("document"))
}

func Body() *Element {
	return WrapElement(Document().Get("body"))
}

func Alert(msg string) {
	js.Global.Call("alert", msg)
}

type File struct {
	*js.Object
	// 	File.lastModifiedDate Read only
	// The last modified Date of the file referenced by the File object.
	LastModifiledData *js.Object `js:"lastModifiedDate"`
	// File.name Read only
	Name string `js:"name"`
	// The name of the file referenced by the File object.
	// File.fileName  Read only  Obsolete since Gecko 7.0
	// The name of the file referenced by the File object.
	// File.fileSize  Read only  Obsolete since Gecko 7.0
	// The size of the referenced file in bytes.
}

func (e *Element) Files() []*File {
	files := e.Get("files")
	out := make([]*File, files.Get("length").Int())
	for i := range out {
		out[i] = &File{Object: files.Call("item", i)}
	}
	return out
}

type FormData struct {
	*js.Object
	Append func(name string, val interface{}) `js:"append"`
	// the below function in only support by firefox
	// Delete func(name string)                   `js:"delete"`
	// Has    func(name string) bool              `js:"has"`
	// Set    func(name string, val interface{})  `js:"set"`
	// Get    func(name string) (val interface{}) `js:"get"`
}

func NewFormData() *FormData {
	o := js.Global.Get("FormData").New()
	return &FormData{
		Object: o,
	}
}

// Type Event implements the Event interface and is embedded by
// concrete event types.
type Event struct {
	*js.Object
	Type string `js:"type"`
	// close event
	Code     int    `js:"code"`
	Reason   string `js:"reason"`
	WasClean bool   `js:"wasClean"`
	// wheel event
	DeltaX    float64 `js:"deltaX"`
	DeltaY    float64 `js:"deltaY"`
	DeltaZ    float64 `js:"deltaZ"`
	DeltaMode int     `js:"deltaMode"`
	// keyboard event
	AltKey        bool   `js:"altKey"`
	CharCode      int    `js:"charCode"`
	CtrlKey       bool   `js:"ctrlKey"`
	Key           string `js:"key"`
	KeyIdentifier string `js:"keyIdentifier"`
	KeyCode       int    `js:"keyCode"`
	Locale        string `js:"locale"`
	Location      int    `js:"location"`
	KeyLocation   int    `js:"keyLocation"`
	MetaKey       bool   `js:"metaKey"`
	Repeat        bool   `js:"repeat"`
	ShiftKey      bool   `js:"shiftKey"`
	// mouse event
	Button int `js:"button"`
	// mouse position
	ClientX   int `js:"clientX"`
	ClientY   int `js:"clientY"`
	MovementX int `js:"movementX"`
	MovementY int `js:"movementY"`
	ScreenX   int `js:"screenX"`
	ScreenY   int `js:"screenY"`
	// 	UIEvent.layerX  Read only
	LayerX int `js:"layerX"`
	// Returns the horizontal coordinate of the event relative to the current layer(element).
	// UIEvent.layerY  Read only
	LayerY int `js:"layerY"`
	// Returns the vertical coordinate of the event relative to the current layer.
	// message event
	Data *js.Object `js:"data"`

	// Event control

	// A boolean indicating whether the event bubbles up through the DOM or not.
	Bubbles bool `js:"bubbles"`
	// A boolean indicating whether the event is cancelable.
	Cancelable bool `js:"cancelable"`
	// A reference to the currently registered target for the event.
	CurrentTarget    *Element `js:"currentTarget"`
	DefaultPrevented bool     `js:"defaultPrevented"`
	// Indicates which phase of the event flow is being processed.
	EventPhase int `js:"eventPhase"`
	// A reference to the target to which the event was originally dispatched.
	Target *Element `js:"target"`
	// The time that the event was created. timestamp in ms
	Timestamp                int    `js:"timeStamp"`
	PreventDefault           func() `js:"preventDefault"`
	StopImmediatePropagation func() `js:"stopImmediatePropagation"`
	StopPropagation          func() `js:"stopPropagation"`
	// The KeyboardEvent.getModifierState() method returns the current state of the specified modifier key,
	// true if the modifier is active (that is the modifier key is pressed or locked), otherwise, false.
	//
	// keyArg
	// 	A modifier key value. The value must be one of the KeyboardEvent.key values which represent modifier keys or "Accel". This is case-sensitive.
	GetModifierState func(keyArg string) bool `js:"getModifierState"`
}

func WrapEvent(event *js.Object) *Event {
	return &Event{
		Object: event,
	}
}

func NewEvent(evt_type string) *Event {
	return WrapEvent(js.Global.Get("Event").New(evt_type))
}

// func (e *Element) AddEventListener(typ string, listener func(*Event), useCapture ...bool) func(*js.Object) {
// 	capture := false
// 	if len(useCapture) >= 1 {
// 		capture = useCapture[0]
// 	}
// 	wrapper := func(o *js.Object) {
// 		ev := &Event{Object: o}
// 		listener(ev)
// 	}
// 	e.Call("addEventListener", typ, wrapper, capture)
// 	return wrapper
// }

// func (e *Element) RemoveEventListener(typ string, listener func(*js.Object), useCapture ...bool) {
// 	capture := false
// 	if len(useCapture) >= 1 {
// 		capture = useCapture[0]
// 	}
// 	e.Call("removeEventListener", typ, listener, capture)
// }

func Window() *Win {
	return WrapWindow(js.Global.Get("window"))
}

func OnLoad(callback func()) {
	Window().AddEventListener(EvtLoad, func(*Event) {
		callback()
	}, false)
}

// The event "DOMContentLoaded" will be fired when the document has been parsed completely,
// that is without stylesheets* and additional images.
// If you need to wait for images and stylesheets, use "load" instead.
func OnDOMContentLoaded(callback func()) {
	Window().AddEventListener(EvtDOMContentLoaded, func(*Event) {
		callback()
	}, false)
}
