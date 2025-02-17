"use client";
import React, { useEffect, useState } from "react";
import thumb from "../../../public/assets/img/user/user-profile.png";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  title: string;
}

import axios from "axios";
import { toast } from "react-toastify";
import GetVideos from "./GetVideos";
import { IWeddingInfoType } from "@/interFace/interFace";
import Preloader from "@/sheardComponent/Preloader/Preloader";
import { Box, Center, Skeleton, Spinner } from "@chakra-ui/react";


const VideoSampleContent = () => {
  const { setUpdate } = useGlobalContext();
  const [upload, setupload] = useState<boolean>(false);
  const [videoUrl, setvideoUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IWeddingInfoType[]>([
    {
      title: "",
      url: "",
      isExpired: false,
      _id: ""
    }
  ]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleGetVideos = async () => {
    axios
      .get(
        `${process.env.BASE_URL}video`
      )
      .then((res) => {
        console.log(res);
        setData(res.data.demoVideo)
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast.error("CURD Operation Is Disabled");
        } else {
          toast.error("CURD Operation Is Disabled");
        }
      })
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setUpdate(false);
    const title = data.title;

    const videoInfo = {
      title,
      url: videoUrl,
    };
    console.log(videoInfo)
    axios
      .post(
        `${process.env.BASE_URL}video/create-video-sample`,
        videoInfo,
      )
      .then((res) => {
        console.log(res)
        if (res.data === "success") {
          setupload(false);
          setUpdate(true);
          toast.success(`Profile Updated`, {
            position: "top-left",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast.error("CURD Operation Is Disabled");
        } else {
          toast.error("CURD Operation Is Disabled");
        }
      })
      .finally(() => {
        setvideoUrl("");  // Clear the video URL in finally block
        reset();
        handleGetVideos();
        setUpdate(false)
      });
  };

  const handleVideoUpload = async (e: any) => {
    setLoading(true);
    console.log('Video upload initiated');
    const file = e.target.files[0];

    // Check if file is a video
    if (file && file.type.startsWith('video/')) {
      setupload(false);

      const formData = new FormData();
      formData.append("media", file);

      try {
        const response = await axios.post(
          `${process.env.BASE_URL}upload`, // Ensure correct base URL
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        // Assuming the video URL is returned in the response
        if (response.data) {
          setupload(true);
          setvideoUrl(response.data.signedUrl);
        }

        console.log("Video uploaded successfully:", response.data);
      } catch (error: any) {
        console.error("Upload error:", error.message);
      } finally {
        setupload(true)
        setLoading(false);
      }
    } else {
      console.error("Please upload a valid video file.");
    }
  };


  const handleClearSingleImg = () => {
    setupload(false);
    setvideoUrl("");
  };

  useEffect(() => {
    handleGetVideos();
  }, [])

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg mb-1">
          <div className="cashier-profile-area">
            <div className="cashier-profile-wrapper flex items-center maxSm:block pb-1 mb-14">
              <div>
                <div>
                  {/* {upload === false && user?.photo === "" && (
                    <Image
                      className="mb-5"
                      width={150}
                      height={150}
                      style={{ width: "100%", height: "100%" }}
                      src={thumb}
                      alt="img not found"
                    />
                  )}
                  {upload === false && user?.photo && (
                    <Image
                      width={150}
                      height={150}
                      style={{ width: "100%", height: "100%" }}
                      className="mb-5"
                      src={user?.photo}
                      alt="img not found"
                    />
                  )} */}

                  <div >
                    {upload === false ? (
                      <>
                        <label htmlFor="profileVideo" style={{ backgroundColor: 'gray', padding: '10px' }} >
                          <i className="fa-regular fa-folder-arrow-up"></i>
                          Upload
                        </label>
                        <input
                          type="file"
                          id="profileVideo"
                          className="hidden"
                          accept="video/*"
                          onChange={handleVideoUpload}
                        />
                      </>
                    ) : (
                      <div className="">
                        <video
                          controls
                          width="500"
                          height="500"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <source src={videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <button
                          onClick={handleClearSingleImg}
                          className="custome_remove_icon"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  {loading &&
                    <Center h="5vh">
                      <Box
                        border="4px solid"
                        borderColor="gray.300"
                        borderTopColor="blue.500"
                        borderRadius="50%"
                        w="50px"
                        h="50px"
                        animation="spin 0.8s linear infinite"
                      />
                    </Center>
                  }
                </div>
              </div>

            </div>
            <div className="grid grid-cols-12 gap-x-7 maxSm:gap-x-0">
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-black font-semibold mt-3">
                    Title
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        placeholder="Enter title"
                        {...register("title", {
                          required: " title is required",
                        })}
                      />
                      {errors.title && (
                        <span className="error-message">
                          {errors.title.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 flex">
                <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                  <button className="btn-primary">Add Video Demo</button>
                </div>
                {/* <div className="cashier-managesale-top-btn default-light-theme pt-2.5 ml-2">
                  <button onClick={openModal} type="button">
                    {" "}
                    Update Password{" "}
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <UpdatePassword closeModal={closeModal} />
      </Modal> */}
      <GetVideos data={data} />
    </>
  );
};

export default VideoSampleContent;
