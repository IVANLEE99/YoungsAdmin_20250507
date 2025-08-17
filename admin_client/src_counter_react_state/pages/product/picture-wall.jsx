import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { ReqUploadImg } from "../../api/urls/manage";
import { baseURL } from "../../api/ajax";
import { deleteImg } from "../../api/manage";
import { BASE_IMG_URL } from "../../utils/constant";

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const App = forwardRef((props, ref) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    const _fileList = props.imgs || [];
    let imgList = _fileList.map((item, index) => {
      return {
        url: BASE_IMG_URL + item,
        name: item,
        uid: -index,
        status: "done",
      };
    });
    setFileList(imgList);
  }, [props.imgs]);
  //   console.log("props", props, _fileList, imgList);
  const handlePreview = (file) =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (!file.url && !file.preview) {
        file.preview = yield getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    });
  const handleChange = async ({ file, fileList: newFileList, event }) => {
    // console.log("file", file);
    // console.log("newFileList", newFileList);
    // console.log(
    //   "file === newFileList[newFileList.length - 1]",
    //   file === newFileList[newFileList.length - 1]
    // );
    // console.log("event", event);
    if (file.status === "done") {
      const { data, status } = file.response;
      if (status === 0) {
        message.success("上传成功");
        file.url = data.url;
        file.name = data.name;
      } else {
        message.error("上传失败");
      }
    } else if (file.status === "removed") {
      let [err, res] = await deleteImg(file.name);
      if (res && res.status === 0) {
        message.success("删除成功");
      } else {
        message.error("删除失败");
      }
    }
    setFileList(newFileList);
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const getImgList = () => {
    return fileList.map((item) => item.name);
  };

  useImperativeHandle(ref, () => ({
    getImgList,
  }));
  return (
    <>
      <Upload
        action={`${baseURL}${ReqUploadImg}`}
        listType="picture-card"
        accept="image/*"
        name="image"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
});
export default App;
