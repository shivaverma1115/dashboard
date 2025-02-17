//@refresh
import VideoSampleMain from "@/components/video-sample/VideoSampleMain";
import ContentWrapper from "@/layout/sidebar/ContentWrapper";

const HomePage = () => {
  return (
    <>
      {/* <HomePageMain /> */}
      <ContentWrapper breadCampTitle='Video Sample'>
        <VideoSampleMain />
      </ContentWrapper>
    </>
  );
};

export default HomePage;
