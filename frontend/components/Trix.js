// // // import React from 'react'
// // // import { TrixEditor } from 'react-trix'

// // // function Trix() {
// // //     console.log('uhh')
// // //     const handleEditorReady = editor => {
// // //         // this is a reference back to the editor if you want to
// // //         // do editing programatically
// // //         editor.insertText('editor is ready')
// // //         console.log({ editor })
// // //     }
// // //     const handleChange = (html, text) => {
// // //         // html is the new html content
// // //         // text is the new text content
// // //         console.log('handle change', { html, text })
// // //     }
// // //     let mergeTags = [
// // //         {
// // //             trigger: '@',
// // //             tags: [
// // //                 { name: 'Dominic St-Pierre', tag: '@dominic' },
// // //                 { name: 'John Doe', tag: '@john' }
// // //             ]
// // //         },
// // //         {
// // //             trigger: '{',
// // //             tags: [
// // //                 { name: 'First name', tag: '{{ .FirstName }}' },
// // //                 { name: 'Last name', tag: '{{ .LastName }}' }
// // //             ]
// // //         }
// // //     ]

// // //     return (
// // //         <div>
// // //             <h3>Editor here ⬇️</h3>
// // //             {/* <TrixEditor
// // //                 onChange={handleChange}
// // //                 onEditorReady={handleEditorReady}
// // //                 placeholder="editor's placeholder"
// // //             /> */}
// // //             {/* <TrixEditor
// // //                 autoFocus={true}
// // //                 placeholder="editor's placeholder"
// // //                 value="initial content <strong>for the editor</strong>"
// // //                 uploadURL="https://domain.com/imgupload/receiving/post"
// // //                 uploadData={{ key1: 'value', key2: 'value' }}
// // //                 mergeTags={mergeTags}
// // //                 onChange={handleChange}
// // //                 onEditorReady={handleEditorReady}
// // //             /> */}
// // //             <h3>up there ⬆️</h3>
// // //         </div>
// // //     )
// // // }

// // // export default Trix

// // // import React from 'react'
// // // import {
// // //     Editor,
// // //     editorStateFromHtml,
// // //     editorStateToHtml,
// // //     editorStateFromRaw,
// // //     editorStateFromText
// // // } from 'last-draft'

// // // function Trix(props) {
// // //     const INITIAL_STATE = editorStateFromText(
// // //         'this is a cooel editor... 🏄🌠🏀'
// // //     )

// // //     state = { editorState: INITIAL_STATE }
// // //     const onChange = editorState => {
// // //         this.setState({ editorState: editorState })
// // //         /* You would normally save this to your database here instead of logging it */
// // //         console.log(editorStateToHtml(editorState))
// // //     }
// // //     return (
// // //         <div>
// // //             {/* <Editor
// // //                 editorState={this.state.editorState}
// // //                 placeholder="Text"
// // //                 onChange={this.onChange}
// // //             /> */}
// // //             )
// // //         </div>
// // //     )
// // // }

// // // export default Trix

// // // import React, { Component } from 'react';
// // // import CKEditor from '@ckeditor/ckeditor5-react';
// // // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// // // class Trix extends Component {
// // //     render() {
// // //         return (
// // //             <div className="Trix">
// // //                 <h2>Using CKEditor 5 build in React</h2>
// // //                 <CKEditor
// // //                     editor={ClassicEditor}
// // //                     data="<p>Hello from CKEditor 5!</p>"
// // //                     onInit={editor => {
// // //                         // You can store the "editor" and use when it is needed.
// // //                         console.log('Editor is ready to use!', editor);
// // //                     }}
// // //                     onChange={(event, editor) => {
// // //                         const data = editor.getData();
// // //                         console.log({ event, editor, data });
// // //                     }}
// // //                     onBlur={editor => {
// // //                         console.log('Blur.', editor);
// // //                     }}
// // //                     onFocus={editor => {
// // //                         console.log('Focus.', editor);
// // //                     }}
// // //                 />
// // //             </div>
// // //         );
// // //     }
// // // }

// // // export default Trix;
// // // import React, { Component } from "react";

// // // import "jodit";
// // // import "jodit/build/jodit.min.css";
// // // import JoditEditor from "jodit-react";

// // // export default class Trix extends Component {
// // //     constructor(props) {
// // //         super(props);
// // //         this.state = {
// // //             content: "content"
// // //         };
// // //     }

// // //     updateContent = value => {
// // //         this.setState({ content: value });
// // //     };
// // //     /**
// // //      * @property Jodit jodit instance of native Jodit
// // //      */
// // //     jodit;
// // //     setRef = jodit => (this.jodit = jodit);

// // //     config = {
// // //         readonly: false // all options from https://xdsoft.net/jodit/doc/
// // //     };
// // //     render() {
// // //         return (
// // //             <JoditEditor
// // //                 editorRef={this.setRef}
// // //                 value={this.state.content}
// // //                 config={this.config}
// // //                 onChange={this.updateContent}
// // //                 styleName="textarea"
// // //                 Name="body"
// // //             />
// // //         );
// // //     }
// // // }

// // // import React, { Component } from 'react'
// // // import Editor from 'react-pell'

// // // export default class Trix extends Component {
// // //     handleChange(html) {
// // //         console.log(html)
// // //     }

// // //     render() {
// // //         return (
// // //             <div>
// // //                 <Editor onChange={this.handleChange.bind(this)} />
// // //             </div>
// // //         )
// // //     }
// // // }

// import React, { Component, PropTypes } from 'react'
// // // // if (typeof window !== 'undefined') {
// // // //     const RichTextEditor = require('react-rte')
// // // // }
// // // // import RichTextEditor from 'react-rte'

// // // import { asyncReactor } from 'async-reactor'
// // // import dynamic from 'next/dynamic'
// // // const RichTextEditor = import('react-rte')
// // // // const RichTextEditor = dynamic(import('react-rte'), { ssr: false })
// // // import propTypes from 'prop-types'
// // // // const RichTextEditor = asyncReactor(async () => {
// // // //     const RichTextEditor = await import('react-rte')
// // // //     return <RichTextEditor />
// // // // })
// // // export default class Trix extends Component {
// // //     componentDidMount = () => {
// // //         console.log('Mounted Trix')
// // //     }

// // //     static getInitialProps() {
// // //         return { contentState: convertToRaw(EditorState.createEmpty().getCurrentContent()) }
// // //     }
// // //     state = {
// // //         // value: RichTextEditor.createEmptyValue()
// // //     }

// // //     onChange = value => {
// // //         this.setState({ value })
// // //         if (this.props.onChange) {
// // //             // Send the changes up to the parent component as an HTML string.
// // //             // This is here to demonstrate using `.toString()` but in a real app it
// // //             // would be better to avoid generating a string on each change.
// // //             this.props.onChange(value.toString('html'))
// // //             // console.log(value)
// // //         }
// // //     }

// // //     render() {
// // //         return (
// // //             <p>ok</p>
// // //         )
// // //     }
// // // }

// import { Editor, EditorState } from 'draft-js'

// export default class Trix extends Component {
//     static getInitialProps() {
//         return {
//             contentState: convertToRaw(
//                 EditorState.createEmpty().getCurrentContent()
//             )
//         }
//     }
//     componentDidMount = () => {
//         console.log('Mounted trix')
//     }
//     state = {
//         editorState: EditorState.createEmpty()
//     }

//     onChange = value => {
//         this.setState({ value })
//     }

//     render() {
//         return (
//             <Editor
//                 editorState={this.state.editorState}
//                 onChange={this.onChange}
//                 // editorKey="EditorName"
//                 editorKey="editor"
//                 data-offset-key="EditorName"
//             />
//         )
//     }
// }


'use strict';

import Draft, { Editor, EditorState, RichUtils, convertFromRaw} from 'draft-js';
const React = require('react');


const

export default class Trix extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createWithContent(emptyContentState),
        };
    }
    onChange = (editorState) => {
        console.log("hello there")
        console.log("hi",convertFromRaw(editorState))
        this.setState({ editorState })
    };
    render() {
        // const Editor = Draft.Editor;
        const editorState = this.state.editorState;
        return (
            <div style={{ border: '1px solid black', padding: 10 }}>
                <Editor
                    placeholder="Write something here!!"
                    editorKey="editor"
                    editorState={editorState}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}


const emptyContentState = Draft.convertFromRaw({
    entityMap: {},
    blocks: [
        {
            text: '',
            key: 'foo',
            type: 'unstyled',
            entityRanges: [],
        },
    ],
});