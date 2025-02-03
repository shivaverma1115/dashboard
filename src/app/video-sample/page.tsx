
import VideoSampleMain from '@/components/video-sample/VideoSampleMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const VideoSamplePage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Video Sample'>
                <VideoSampleMain />
            </ContentWrapper>
        </>
    );
};

export default VideoSamplePage;