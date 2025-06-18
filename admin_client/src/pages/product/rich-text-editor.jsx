import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
import draftToHtml from 'draftjs-to-html';
export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  componentDidMount() {
    if (this.props.detail) {
      this.setState({
        editorState: EditorState.createWithContent(
          ContentState.createFromText(this.props.detail)
        ),
      });
    } else {
      this.setState({
        editorState: EditorState.createEmpty(),
      });
    }
  }
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
        <textarea
          disabled
          value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}
