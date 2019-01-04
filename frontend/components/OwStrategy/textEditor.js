import React, { Component } from 'react'
import styled from 'styled-components'

class TextEditor extends Component { 
	constructor(props){
		super(props)
		this.state = {
			textContents: ''
		}
	}
	

	render(){

		const Editor = styled.div`
			@font-face {
				font-family: 'Roboto', sans-serif;
				src: url('https://fonts.googleapis.com/css?family=Roboto')
			}
			font-family: 'Roboto', sans-serif;
			justify-content: center;
		    box-shadow: 0 .1rem .4rem black;
		    border: 1px solid black;
		    overflow-y: auto;

		    line-spacing: 10px;
		`

		const Toolbar = styled.div`
			.toolbar{
			    display:grid;
			    grid-template-columns: repeat(auto-fit,minmax(20px,40px));
			    background-color: rgb(231, 231, 231);
			    color: rgb(0, 0, 0);
			    grid-gap: 1rem;
			    padding: 1rem;
			    justify-content: center;
			    align-items:center;
			}

			.tool-items{
			    background-color: rgb(27, 26, 26);
			     padding-top: .6rem;
			     padding-bottom:.6rem;
			    cursor: pointer;
			    color: #ffff;
			}

			.tool-items:hover{
			    box-shadow: none;
			    background-color: #6b5e5e;
			}
		`
		// Update text
		const handleChange = (e) => {
			this.setState({textContents: e.target.value})
		}

		// Handle tabs
		const handleKey = (e) => {
			if (e.shiftKey && e.key === 'Tab'){
				e.preventDefault()
				document.execCommand('outdent',false,'')
			}
			else if(e.key === 'Tab'){
				e.preventDefault()
				document.execCommand('indent',false,'')
			}
		}

		const testerino = () => {
			this.setState({textContents: '???'})
		}


		return (
			
			<div>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
				<Toolbar className="toolbar">

				    <button type="button" className="tool-items fa fa-underline"  onClick={() => {document.execCommand('underline', false, '')}}></button>
				    <button type="button" className="tool-items fa fa-italic" onClick={() => {document.execCommand('italic', false, '')}}></button>
				    <button type="button" className="tool-items fa fa-bold" onClick={() => document.execCommand('bold', false, '')}></button>
				    <button type="button" className="tool-items fa fa-strikethrough" onClick={() => document.execCommand('strikeThrough',false,'')}></button>

				    <button type="button" className="tool-items fa fa-align-center" onClick={() => document.execCommand('justifyCenter',false,'')}></button>
				    <button type="button" className="tool-items fa fa-align-left" onClick={() => document.execCommand('justifyLeft',false,'')}></button>
				    <button type="button" className="tool-items fa fa-align-right" onClick={() => document.execCommand('justifyRight',false,'')}></button>

					<button type="button" className="tool-items fa fa-list" onClick={() => document.execCommand('insertUnorderedList',false,'')}></button>
					<button type="button" className="tool-items fa fa-list-ol" onClick={() => document.execCommand('insertOrderedList',false,'')}></button>

					<button type="button" className="tool-items fa fa-indent" onClick={() => document.execCommand('indent',false,'')}></button>
					<button type="button" className="tool-items fa fa-outdent" onClick={() => document.execCommand('outdent',false,'')}></button>
				</Toolbar>

				<div className="center">
					<ContentEditable html={this.state.textContents} onChange={handleChange} />
				</div>
				<button type="button" onClick={testerino}/>

				<div className="center">
					<section className="getcontent">
					</section>
				</div>

			</div>

		)
	}
}

export default TextEditor

// Doesn't work, outdated?
class ContentEditable extends Component { 
	constructor(props){
		super(props)
	}

	render(){

		const shouldComponentUpdate = (nextProps) => {
			return nextProps.html !== this.getDomNode().innerHTML
		}

		const componentDidUpdate = () => {
			if (this.props.textContents !== this.getDOMNode().innerHTML) {
				this.getDOMNode().innerHTML = this.props.textContents
			}
		}

		const emitChange = () => {
			let html = this.getDomNode().innerHTML
			console.log(html)
			if (this.props.onChange && html !== this.lastHtml) {
				this.props.onChange({ target: {value: html} })
			}
			this.lastHtml = html;
			console.log("textcontents", this.props.textContents)
		}

		return (
			<div
				onInput={this.emitChange}
				onBlur={this.emitChange}
				contentEditable
				dangerouslySetInnerHTML={{__html: this.props.textContents}}>
			</div>
		)

	}
}

/*
<Editor className="editor" value={this.state.textContents} contentEditable onChange={handleChange} onKeyDown={handleKey}>
					</Editor>
*/