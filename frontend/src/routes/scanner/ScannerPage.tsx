import "./QrStyles.css";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";
import axios from "axios";
import BeatLoaderDiv from "../../components/spinner/BeatLoaderDiv";

export default function ScannerPage() {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    const transactionData = result.data;

    scanner?.current?.stop();

    setLoading(true);

    axios
      .post("http://localhost:8080/api/payment/request", transactionData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        navigate("/transaction-success-result", { state: result.data });
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          navigate("/transaction-fail-result", { state: error.response.data });
        } else {
          console.error("Unexpected error:", error);
        }
      });
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  const onClickBack = () => {
    navigate("/main");
  };

  return (
    <div>
      {isLoading && <BeatLoaderDiv />}
      <div className="absolute top-0 left-0 w-full h-[20%] bg-black bg-opacity-30 z-10 pt-1">
        <IoChevronBackOutline size="50" color="white" onClick={onClickBack} />
      </div>

      <div className="qr-reader">
        <video ref={videoEl}></video>

        <div ref={qrBoxEl} className="qr-box">
          <img
            src={QrFrame}
            alt="Qr Frame"
            width={256}
            height={256}
            className="qr-frame"
          />
        </div>
      </div>

      <div className="flex justify-center items-center absolute bottom-0 left-0 w-full h-[20%] bg-black bg-opacity-30 z-10">
        <p className="z-20 text-lg text-white">
          결제 QR을 화면 정중앙에 스캔해주세요.
        </p>
      </div>
    </div>
  );
}
