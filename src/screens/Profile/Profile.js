import React from 'react';
import {Card, CardHeader, CardText, Paper} from 'material-ui';

import Repositories from 'components/Repositories';

const Profile = ({
  user,
  loading,
  onLoadMoreRepositories,
  onStarRemove,
  onStarAdd,
}) => (user && user.login) ? (
  <div>
    <Card>
      <CardHeader
        title={user.name}
        subtitle={user.login}
        avatar={user.avatarUrl}
        actAsExpander={true}
        showExpandableButton={false}
      />
    </Card>
    <div>
      <Repositories
        items={user.repositories.nodes}
        showLoadMore={user.repositories.pageInfo.hasNextPage}
        onClickLoadMore={onLoadMoreRepositories}
        pageInfo={user.repositories.pageInfo}
        onStarAdd={onStarAdd}
        onStarRemove={onStarRemove}
      />
    </div>
  </div>
) : (
  !user && !loading ? (<h1>User is not found</h1>) : null
);

export default Profile;
