import {
    Editor,
    EditorState,
    ContentState,
    convertToRaw,
    convertFromRaw,
    RichUtils
} from 'draft-js'

import styled from 'styled-components'
import { draftjsToMd } from 'draftjs-md-converter'

const RichEditorRoot = styled.div`
    /* background: #fff; */
    border: 1px solid #ddd;
    font-family: 'Georgia', serif;
    font-size: 14px;
    padding: 15px;
`
const RichEditorEditor = styled.div`
    /* border-top: 1px solid #ddd; */
    cursor: text;
    font-size: 16px;
    margin-top: 10px;
`

const RichEditorStyleButton = styled.span`
    color: #999;
    cursor: pointer;
    margin-right: 16px;
    padding: 2px 0;
    display: inline-block;
`

const RichEditorControls = styled.div`
    font-family: 'Helvetica', sans-serif;
    font-size: 14px;
    margin-bottom: 5px;
    user-select: none;
`
const RichEditorActiveButton = styled.span`
    /* color: #999; */
    cursor: pointer;
    margin-right: 16px;
    padding: 2px 0;
    display: inline-block;
    color: #5890ff;
`
const RichEditorBlockquote = styled.div`
    border-left: 5px solid #eee;
    color: #666;
    font-family: 'Hoefler Text', 'Georgia', serif;
    font-style: italic;
    margin: 16px 0;
    padding: 10px 20px;
`

export default class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            editor: null
        }

        this.focus = () => this.refs.editor.focus()
        // this.onChange = editorState => this.setState({ editorState })
        // this.onChange = editorState => this.props.handleChange()
        this.onChange = editorState => {
            this.setState({ editorState })
            const content = this.state.editorState.getCurrentContent()
            // console.log('MARKDOWN?', draftjsToMd(convertToRaw(content)))
            this.props.updateMD(
                this.props.isDefense,
                draftjsToMd(convertToRaw(editorState.getCurrentContent()))
            )
        }

        this.handleKeyCommand = command => this._handleKeyCommand(command)
        this.onTab = e => this._onTab(e)
        this.toggleBlockType = type => this._toggleBlockType(type)
        this.toggleInlineStyle = style => this._toggleInlineStyle(style)
    }
    componentDidMount() {
        this.setState({ editor: Editor })
    }

    _handleKeyCommand(command) {
        const content = this.state.editorState.getCurrentContent()
        console.log('MARKDOWN?', draftjsToMd(convertToRaw(content)))
        const { editorState } = this.state
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            this.onChange(newState)
            return true
        }
        return false
    }

    _onTab(e) {
        const maxDepth = 4
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(this.state.editorState, blockType)
        )
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        )
    }

    render() {
        const ClientEditor = this.state.editor

        const { editorState } = this.state

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor'
        var contentState = editorState.getCurrentContent()
        if (!contentState.hasText()) {
            if (
                contentState
                    .getBlockMap()
                    .first()
                    .getType() !== 'unstyled'
            ) {
                className += ' RichEditor-hidePlaceholder'
            }
        }

        return (
            <RichEditorRoot className="RichEditor-root">
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <RichEditorEditor className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        placeholder="Place a Strat Here"
                        ref="editor"
                        spellCheck={true}
                    />
                </RichEditorEditor>
            </RichEditorRoot>
        )
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    },
    BLOCK: {
        borderLeft: '5px solid #eee',
        color: '#666',
        fontFamily: "'Hoefler Text', 'Georgia', serif",
        fontStyle: 'italic',
        margin: '16px 0',
        padding: '10px 20px'
    }
}

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote'
        default:
            return null
    }
}

class StyleButton extends React.Component {
    constructor() {
        super()
        this.onToggle = e => {
            e.preventDefault()
            this.props.onToggle(this.props.style)
        }
    }

    render() {
        // let className = 'RichEditor-styleButton'
        // if (this.props.active) {
        //     className += ' RichEditor-activeButton'
        // }

        // return (
        //     <span className={className} onMouseDown={this.onToggle}>
        //         {this.props.label}
        //     </span>
        // )

        return this.props.active ? (
            <RichEditorActiveButton onMouseDown={this.onToggle}>
                {this.props.label}
            </RichEditorActiveButton>
        ) : (
            <RichEditorStyleButton onMouseDown={this.onToggle}>
                {this.props.label}
            </RichEditorStyleButton>
        )
    }
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' }
]

const BlockStyleControls = props => {
    const { editorState } = props
    const selection = editorState.getSelection()
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map(type => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
        </div>
    )
}

var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    // { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' }
]

const InlineStyleControls = props => {
    var currentStyle = props.editorState.getCurrentInlineStyle()
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
        </div>
    )
}
