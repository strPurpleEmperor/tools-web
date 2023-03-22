import { Button, Upload } from "antd";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import xlsx from "node-xlsx";
import styles from "@/styles/index.module.css";
import { createReport } from "docx-templates";
import FileSaver from "file-saver";
import JSZip from "jszip";
import { getFileType } from "@/utils";

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
          const jsZip = new JSZip();
          const excelData = JSON.parse(JSON.stringify(excel[0].data || []));
          const keys: string[] = excelData.shift();
          const values: any[][] = excelData;
          const p: any[] = [];
          const nameMap: Record<string, number> = {};
          values.forEach((v) => {
            const data: Record<string, any> = {};
            keys.forEach((k, index) => {
              data[k] = v[index] || 0;
            });
            const buf = createReport({
              template: Buffer.from(word),
              cmdDelimiter: ["{", "}"],
              data,
            });
            let name = fileName.replace(/{([\W\w]+)}/g, function (match, $1) {
              return data[$1];
            });
            if (nameMap[name] !== void 0) {
              nameMap[name]++;
              const [oName, fileType] = getFileType(name);
              name = `${oName}(${nameMap[name]})${fileType}`;
            } else {
              nameMap[name] = 0;
            }
            p.push({ buf, name });
          });
          p.forEach((p) => {
            jsZip.file(p.name, p.buf, {
              binary: true,
            });
          });
          const rename = new Date().toString();
          jsZip.generateAsync({ type: "blob" }).then((content) => {
            // 生成二进制流
            FileSaver.saveAs(content, rename); // 利用file-saver保存文件  自定义文件名
          });
        }}
      >
        按钮
      </Button>
    </div>
  );
}
