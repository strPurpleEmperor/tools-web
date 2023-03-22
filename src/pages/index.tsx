import { Button, Upload } from "antd";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import xlsx from "node-xlsx";
import styles from "@/styles/index.module.css";
import { createReport } from "docx-templates";
import FileSaver from "file-saver";

export default function Home() {
  const [word, setWord] = useState<ArrayBuffer>(new ArrayBuffer(0));
  const [excel, setExcel] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>("");
  return (
    <div className={styles.merge}>
      <div className={styles.merge_wrap}>
        <Upload.Dragger
          className={styles.merge_upload}
          accept=".docx"
          beforeUpload={() => false}
          maxCount={1}
          onChange={async (info) => {
            if (!info.fileList.length) {
              return setWord(new ArrayBuffer(0));
            }
            const buffer =
              (await info.fileList[0].originFileObj?.arrayBuffer()) as ArrayBuffer;
            setFileName(info.fileList[0]?.name || "");
            setWord(buffer);
          }}
        >
          <div style={{ flex: 1 }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">上传或者拖拽word模板</p>
          </div>
        </Upload.Dragger>
        <div className={styles.upload_space} />
        <Upload.Dragger
          className={styles.merge_upload}
          maxCount={1}
          accept=".xlsx"
          beforeUpload={() => false}
          onChange={async (info) => {
            if (!info.fileList.length) {
              return setExcel([]);
            }
            const buffer =
              (await info.fileList[0].originFileObj?.arrayBuffer()) as ArrayBuffer;
            setExcel(xlsx.parse(buffer));
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">上传或者拖拽Excel数据</p>
        </Upload.Dragger>
      </div>
      <Button
        onClick={async () => {
          const b = await createReport({
            template: Buffer.from(word),
            cmdDelimiter: ["{", "}"],
            data: (...arg) => {
              console.log(arg);
              return "1";
            },
            failFast: false,
          });
          console.log(b);
          FileSaver.saveAs(new Blob(b), fileName);
        }}
      >
        按钮
      </Button>
    </div>
  );
}
