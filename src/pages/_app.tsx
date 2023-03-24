import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import { Button, FloatButton, Image, notification } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { BASE_URL } from "@/const";

export default function App({ Component, pageProps }: AppProps) {
  function openQ() {
    notification.open({
      message: <Image src={`${BASE_URL}/kele.jpg`} alt="" />,
      icon: null,
    });
  }
  return (
    <>
      <Component {...pageProps} />
      <FloatButton.Group>
        <FloatButton
          icon={<StarOutlined />}
          tooltip={
            <Button type="link" onClick={openQ}>
              <span style={{ color: "white" }}>请我喝阔啦</span>
            </Button>
          }
        />
        <FloatButton.BackTop />
      </FloatButton.Group>
    </>
  );
}
