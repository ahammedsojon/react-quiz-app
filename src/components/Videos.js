import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";
const Videos = () => {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);
  return (
    <div>
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
      {!loading && !error && videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          next={() => setPage(page + 8)}
          hasMore={hasMore}
          loader="Loading..."
        >
          {videos.map((video) => (
            <Video key={video.youtubeID} video={video} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Videos;
