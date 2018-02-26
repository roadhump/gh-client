import React from 'react';
import {Card, CardHeader, CardActions, FlatButton} from 'material-ui';
import ActionGrade from 'material-ui/svg-icons/action/grade';

const Repository = ({item, onStarAdd, onStarRemove}) => (
  <Card>
    <CardHeader
      title={item.name}
      subtitle={item.description}
    />
    <CardActions>
      <FlatButton
        label={item.viewerHasStarred ? 'Unstar' : 'Star'}
        primary={true}
        onClick={item.viewerHasStarred ? onStarRemove : onStarAdd}
        icon={(
          <ActionGrade />
        )}
      />
    </CardActions>
  </Card>
);

export default Repository;
