import React, { Component } from 'react'
import styled from 'styled-components'

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textContents: ''
        }
    }
    // TODO: whenever we click the buttons we lose focus. Not going to try it quite yet, but after a clock, you should just be able to re=select the focus back onto the text box.
    // Actually the bullet points and lines work correctly.

    render() {
        // TODO: styled components don't work yet.
        const Editor = styled.div`
            @font-face {
                font-family: 'Roboto', sans-serif;
                src: url('https://fonts.googleapis.com/css?family=Roboto');
            }
            font-family: 'Roboto', sans-serif;
            justify-content: center;
            box-shadow: 0 0.1rem 0.4rem black;
            border: 1px solid black;
            overflow-y: auto;
            font-size: 1rem;

            line-spacing: 10px;
            /* TODO: doesn't exist, look into: https://stackoverflow.com/questions/3845433/css-line-spacing*/
        `
        const Toolbar = styled.div`
            .toolbar {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(20px, 40px));
                background-color: rgb(231, 231, 231);
                color: rgb(0, 0, 0);
                grid-gap: 1rem;
                padding: 1rem;
                justify-content: center;
                align-items: center;
            }

            .tool-items {
                background-color: rgb(27, 26, 26);
                padding-top: 0.6rem;
                padding-bottom: 0.6rem;
                cursor: pointer;
                color: #ffff;
            }

            .tool-items:hover {
                box-shadow: none;
                background-color: #6b5e5e;
            }
        `
        // Update text
        const handleChange = e => {
            this.setState({ textContents: e.target.value })
            this.props.updateMD(this.props.isDefense, e.target.value) // TODO: kinda redundant huh, we'll need to look into this.
        }

        // Handle tabs

        return (
            <div>
                {/* We will want to remove these eventually, or at least lazy import them later. */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <Toolbar className="toolbar">
                    <button
                        type="button"
                        className="tool-items fa fa-underline"
                        onClick={e => {
                            e.preventDefault()
                            document.execCommand('underline', false, '')
                        }}
                    />
                    <button
                        type="button"
                        className="tool-items fa fa-italic"
                        onClick={() => {
                            document.execCommand('italic', false, '')
                        }}
                    />
                    <button
                        type="button"
                        className="tool-items fa fa-bold"
                        onClick={e => {
                            e.preventDefault()
                            document.execCommand('bold', false, '')
                        }}
                    />
                    <button
                        type="button"
                        className="tool-items fa fa-strikethrough"
                        onClick={e => {
                            e.preventDefault()
                            document.execCommand('strikeThrough', false, '')
                        }}
                    />

                    <button
                        type="button"
                        className="tool-items fa fa-align-center"
                        onClick={e => {
                            e.preventDefault()
                            document.execCommand('justifyCenter', false, '')
                        }}
                    />
                    <button
                        type="button"
                        className="tool-items fa fa-align-left"
                        onClick={e => {
                            e.preventDefault()
                            document.execCommand('justifyLeft', false, '')
                        }}
                    />
                    <button
                        type="button"
                        className="tool-items fa fa-align-right"
                        onClick={e => {
                            e.preventDefault()
                            document.execCommand('justifyRight', false, '')
                        }}
                    />

                    <button
                        type="button"
                        className="tool-items fa fa-list"
                        onClick={e => {
                            e.preventDefault()
                            document.execCommand(
                                'insertUnorderedList',
                                false,
                                ''
                            )
                        }}
                    />
                    <button
                        type="button"
                        className="tool-items fa fa-list-ol"
                        onClick={e => {
                            e.preventDefault()
                            document.execCommand('insertOrderedList', false, '')
                        }}
                    />

                    <button
                        type="button"
                        className="tool-items fa fa-indent"
                        onClick={e => {
                            e.preventDefault()
                            document.execCommand('indent', false, '')
                        }}
                    />
                    <button
                        type="button"
                        className="tool-items fa fa-outdent"
                        onClick={e => {
                            e.preventDefault()
                            document.execCommand('outdent', false, '')
                        }}
                    />
                </Toolbar>

                <div className="center">
                    <ContentEditable
                        html={this.state.textContents}
                        onChange={handleChange}
                        // value={this.state.textContents}
                    />
                </div>

                <div className="center">
                    <section className="getcontent" />
                </div>
            </div>
        )
    }
}

export default TextEditor

// Doesn't work, outdated?
class ContentEditable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        //these aren't doing anything
        const shouldComponentUpdate = nextProps => {
            console.log('component  should updated')
            return nextProps.html !== this.getDomNode().innerHTML
        }

        const componentDidUpdate = () => {
            if (this.props.textContents !== this.getDOMNode().innerHTML) {
                console.log('component did updated')
                this.getDOMNode().innerHTML = this.props.textContents
            }
        }

        const emitChange = e => {
            let html = e.target.innerHTML
            // console.log({ html })
            if (this.props.onChange && html !== this.lastHtml) {
                this.props.onChange({ target: { value: html } })
            }
            this.lastHtml = html
            // console.log('textcontents', this.props.textContents)
        }
        const handleKey = e => {
            if (e.shiftKey && e.key === 'Tab') {
                e.preventDefault()
                document.execCommand('outdent', false, '')
            } else if (e.key === 'Tab') {
                e.preventDefault()
                document.execCommand('indent', false, '')
            }
        }

        return (
            <div
                contentEditable
                dangerouslySetInnerHTML={{ __html: this.props.textContents }}
                onBlur={emitChange}
                onInput={emitChange}
                onKeyDown={handleKey}
            />
        )
    }
}

/*
<Editor className="editor" value={this.state.textContents} contentEditable onChange={handleChange} onKeyDown={handleKey}>
					</Editor>
*/
