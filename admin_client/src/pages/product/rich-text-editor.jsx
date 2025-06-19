import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    console.log(props, "props");
    // https://jpuri.github.io/react-draft-wysiwyg/#/docs
    let html = props.detail || "";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.detail !== this.props.detail) {
      let html = this.props.detail || "";
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        const newEditorState = EditorState.createWithContent(contentState);
        this.setState({ editorState: newEditorState });
      } else {
        this.setState({
          editorState: EditorState.createEmpty(),
        });
      }
    }
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  getDetail = () => {
    return draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
  };
  componentDidMount() {}
  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorStyle={{
            minHeight: "200px",
            padding: "0 10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(
            convertToRaw(this.state.editorState.getCurrentContent())
          )}
        /> */}
      </div>
    );
  }
}
