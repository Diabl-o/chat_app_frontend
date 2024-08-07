import profileImage from "../assets/profilepicture.png";
import { FiPhone } from "react-icons/fi";
import { FiVideo } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FaImage } from "react-icons/fa";
import { GrDocument } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const MessageBox = () => {
  const [attachOptionVisible, setAttachOptionVisible] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const attachOptionsRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [message, setMessage] = useState({
    content: "",
    media: "",
    mediaType: "",
    seen: "",
  });
  const [previewUrl, setPreviewUrl] = useState({
    image: "",
    imageName: "",
    video: "",
    videoName: "",
    document: "",
    documentName: "",
    isPDF: "",
  });

  const handleMouseEnter = () => {
    if (!attachOptionVisible) {
      setTimeout(() => {
        setTooltipVisible(!isTooltipVisible);
      }, 1000);
    }
  };
  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        attachOptionsRef.current &&
        attachOptionsRef.current.contains(e.target)
      ) {
        // Click is inside the attachment options container, do nothing
        return;
      }
      setAttachOptionVisible(false);
    };
    if (attachOptionVisible) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [attachOptionVisible]);

  const toggleAttachOptionVisibility = (e) => {
    e.stopPropagation();
    setAttachOptionVisible(!attachOptionVisible);
    setTooltipVisible(false);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl((prev) => {
        return {
          ...prev,
          image: reader.result,
          imageName: file.name,
        };
      });
    };
    reader.readAsDataURL(file);
    setMessage((prev) => {
      return { ...prev, media: file };
    });
    setAttachOptionVisible(false);
  };
  const handleImagePreview = () => {
    setPreviewUrl((prev) => {
      return { ...prev, image: "", imageName: "" };
    });
    setMessage((prev) => {
      return { ...prev, media: "" };
    });
  };
  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl((prev) => {
        return { ...prev, video: reader.result, videoName: file.name };
      });
    };
    reader.readAsDataURL(file);
    setMessage((prev) => {
      return { ...prev, media: file };
    });
    setAttachOptionVisible(false);
  };
  const handleVideoPreview = () => {
    setPreviewUrl((prev) => {
      return { ...prev, video: "", videoName: "" };
    });
    setMessage((prev) => {
      return { ...prev, media: "" };
    });
  };
  const handleUploadDocument = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl((prev) => {
        return {
          ...prev,
          document: reader.result,
          documentName: file.name,
          isPDF: file.name.endsWith(".pdf"),
        };
      });
    };
    reader.readAsDataURL(file);
    setMessage((prev) => {
      return { ...prev, media: file };
    });
    setAttachOptionVisible(false);
  };
  const handleDocumentPreview = () => {
    setPreviewUrl((prev) => {
      return { ...prev, document: "", documentName: "" };
    });
    setMessage((prev) => {
      return { ...prev, media: "" };
    });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));

  return (
    <div className="flex flex-col pt-5 pb-5 pr-5 pl-[16px] h-screen w-full">
      <div className="flex flex-col flex-grow bg-white rounded-3xl shadow-[0px_4px_5px_2px_#79C5EF61] p-8">
        {/* top part */}
        <div className="flex flex-row justify-between mb-3">
          <div className="flex flex-row">
            <div className=" mr-5">
              <img src={profileImage} className="rounded-full h-12"></img>
            </div>
            <div className="flex flex-col mt-2">
              <span className=" text-xl font-semibold leading-4">
                Chat Name
              </span>
              <span className=" text-sm font-light">Last seen 2 days ago</span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <FiPhone size={25} className=" mr-10" />
            <FiVideo size={30} className="mr-8" />
            <BsThreeDotsVertical size={26} />
          </div>
        </div>
        <hr className=" border-[#B4ABABA8] border-[1px]" />
        {/* message part */}
        <div className="w-full h-full overflow-x-hidden overflow-y-scroll no-scrollbar ">
          {previewUrl.image && (
            <div className=" flex flex-col flex-1 overflow-x-hidden overflow-y-hidden justify-center items-center relative w-full h-full bg-slate-900 bg-opacity-40">
              <div className="absolute top-2 right-2">
                <button className=" " onClick={handleImagePreview}>
                  <IoMdClose size={30} />
                </button>
              </div>
              <div className=" shadow-[#0F172A66] rounded shadow-2xl ">
                <img src={previewUrl.image} className=" max-w-xs" />
              </div>
            </div>
          )}
          {previewUrl.video && (
            <div className=" flex flex-col flex-1 overflow-x-hidden overflow-y-hidden justify-center items-center  relative  w-full h-full bg-slate-900 bg-opacity-40">
              <div className="absolute top-2 right-2">
                <button className=" " onClick={handleVideoPreview}>
                  <IoMdClose size={30} />
                </button>
              </div>
              <div className="shadow-[#0F172A66] rounded shadow-2xl">
                <video
                  src={previewUrl.video}
                  className="  max-w-xs "
                  autoPlay
                  muted
                  controls
                />
              </div>
            </div>
          )}
          {previewUrl.document && (
            <div className=" flex flex-col flex-1 overflow-x-hidden overflow-y-hidden justify-center items-center  relative  w-full h-full bg-slate-900 bg-opacity-40">
              <div className="absolute top-2 right-2">
                <button className=" " onClick={handleDocumentPreview}>
                  <IoMdClose size={30} />
                </button>
              </div>
              <span className="absolute top-3">{previewUrl.documentName}</span>
              <div className=" shadow-[#0F172A66] shadow-2xl rounded ">
                {previewUrl.isPDF ? (
                  <div className="flex flex-col w-auto h-auto">
                    <div className="flex relative flex-col justify-center items-center w-full h-full group">
                      <Document
                        file={previewUrl.document}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page
                          pageNumber={pageNumber}
                          height={410}
                          className="mt-2"
                        />
                      </Document>
                      <div className="flex absolute justify-between rounded bottom-5 w-[150px] bg-white z-[5] shadow-[0_30px_40px_0_#10245e33] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className={`w-10 h-10 flex items-center justify-center rounded-bl rounded-tl ${
                            pageNumber <= 1
                              ? " opacity-50"
                              : "hover:bg-[#e6e6e6] hover:cursor-pointer"
                          }`}
                          onClick={goToPrevPage}
                          disabled={pageNumber <= 1}
                        >
                          &lt;
                        </button>
                        <span className=" flex items-center">
                          {pageNumber} of {numPages}
                        </span>
                        <button
                          className={`w-10 h-10 flex items-center justify-center rounded-tr rounded-br  ${
                            pageNumber >= numPages
                              ? " opacity-50"
                              : "hover:bg-[#e6e6e6] hover:cursor-pointer"
                          }`}
                          onClick={goToNextPage}
                          disabled={pageNumber >= numPages}
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-[350px] h-[250px] p-10">
                    <div className="flex flex-col justify-center items-center w-full h-full">
                      <span className="">
                        <GrDocument size={60} className=" opacity-20" />
                      </span>
                      <span className=" opacity-20 font-medium pt-3 text-xl">
                        No preview available
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* message input */}
        <div className="relative mt-auto pt-2">
          <button
            onClick={(e) => toggleAttachOptionVisibility(e)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute bottom-[13px] left-5 group"
          >
            <AiOutlinePaperClip size={22} />
            {!attachOptionVisible && isTooltipVisible && (
              <span className="absolute bottom-9 left-1/2 transform -translate-x-1/2 w-max px-2 py-1 text-sm shadow bg-white rounded opacity-100 transition-opacity duration-200">
                Attach
              </span>
            )}
          </button>
          <form className="flex flex-row">
            <input
              className="bg-[#EFF6FCDE;] rounded-3xl w-full pl-12 h-12"
              placeholder="Type your message here..."
            ></input>
            <button className="bg-[#0e0e0e] text-white rounded-2xl px-4 ml-6">
              Send
            </button>
          </form>

          {/* attach items */}
          {attachOptionVisible && (
            <div
              ref={attachOptionsRef}
              className="bg-white shadow rounded absolute bottom-[50px] w-36 p-2"
            >
              <form>
                <label
                  htmlFor="image"
                  className="flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div>
                    <FaImage />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="video"
                  className="flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div>
                    <FiVideo size={19} />
                  </div>
                  <p>Video</p>
                </label>
                <label
                  htmlFor="document"
                  className="flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div>
                    <GrDocument />
                  </div>
                  <p>Document</p>
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleUploadImage}
                />
                <input
                  type="file"
                  name="video"
                  id="video"
                  onChange={handleUploadVideo}
                />
                <input
                  type="file"
                  name="document"
                  id="document"
                  onChange={handleUploadDocument}
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
