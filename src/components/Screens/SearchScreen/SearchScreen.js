import React, { useEffect, useState } from 'react';
import './_SearchScreen.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideosBySearch } from '../../../redux/actions/videos.action';
import { Container } from 'react-bootstrap';
import VideoHorizontal from '../../VideoHorizontal/VideoHorizontal';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from 'react-helmet';

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.searchedVideos);
  const [prevVideos, setPrevVideos] = useState([]);

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [dispatch, query]);

  useEffect(() => {
    setPrevVideos(videos);
  }, [videos]);

  const fetchData = () => {
    dispatch(getVideosBySearch(query));
  };

  return (
    <Container>
      <Helmet>
        <title>{query}</title>
      </Helmet>
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={<div className='spinner-border text-danger d-block mx-auto'></div>}
        className='row'
        key={videos.join()}
      >
        {videos.map((video) => (
          <VideoHorizontal video={video} key={video.id.videoId} SearchScreen />
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default SearchScreen;
