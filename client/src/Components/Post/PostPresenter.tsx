import React from "react";
import styled from "../../Styles/typed-components";
import { HeartEmpty, Comment as CommentIcon } from "../Icons";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  user-select: none;
  margin-bottom: 25px;
  a {
    color: inherit;
  }
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

interface IFProps {
  src: string;
  static?: string;
}

const ImgFile = styled.div`
  max-width: 100%;
  width: 100%;
  height: 300px;
  top: 0;
  background-image: url(${(props: IFProps) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const VideoFile = styled.div`
  max-width: 100%;
  width: 100%;
  height: 200px;
  top: 0;
  background-image: url(${(props: IFProps) => props.static});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &:hover {
    background-image: url(${(props: IFProps) => props.src});
  }
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const LikeCount = styled.div`
  font-size: 14px;
`;

const Title = styled.div`
  margin-top: 10px;
  height: 15px;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;

const Caption = styled.div`
  margin: 10px 0;
`;

const UserName = styled.div`
  padding: 5px 0;
  font-size: 16px;
  font-weight: 500
  opacity: 0.6;
  cursor: pointer;
`;

const Timestamp = styled.span`
  font-weight: 500;
  text-transform: uppercase;
  opacity: 0.6;
  display: block;
  font-size: 14px;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

export default ({
  id,
  user: { username },
  title,
  file,
  likeCount,
  createdAt
}) => {
  let isImage = true;
  let url = file.url;
  let urlStatic = file.url;
  if (file.mimetype.substring(0, 5) === "video") {
    isImage = false;
    const index = file.url.lastIndexOf(".");
    url = url.substring(0, index) + ".gif";
    urlStatic = url.substring(0, index) + ".png";
  }
  const onClick = () => {
    window.location.assign(`/video/${id}`);
  };
  return (
    <Post>
      <Files>
        <div onClick={onClick}>
          {isImage ? (
            <ImgFile key={file.id} src={file.url} />
          ) : (
            <VideoFile key={file.id} src={url} static={urlStatic} />
          )}
        </div>
      </Files>
      <Meta>
        <Buttons>
          <Button>
            <HeartEmpty />
          </Button>
          <CommentIcon />
        </Buttons>
        <LikeCount>
          {likeCount === 1 ? "1 like" : `${likeCount} likes`}
        </LikeCount>
        <Title onClick={onClick}>{title}</Title>
        <Caption>
          <UserName onClick={() => window.location.assign(`/user/${username}`)}>
            {username}
          </UserName>
        </Caption>
        <Timestamp>{createdAt}</Timestamp>
      </Meta>
    </Post>
  );
};
