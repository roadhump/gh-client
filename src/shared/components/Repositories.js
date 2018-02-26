import React from 'react';
import {FlatButton} from 'material-ui';
import {withHandlers, compose} from 'recompose';

import Repository from './Repository';

const Repositories = ({items, onStarAdd, onStarRemove, showLoadMore, onClickLoadMore}) => (
    <div>
      {items.map((v) => (
        <Repository
          key={v.id}
          item={v}
          onStarAdd={() => onStarAdd(v.id)}
          onStarRemove={() => onStarRemove(v.id)}
        />
      ))}
      {showLoadMore ? (
        <FlatButton
          key={'flt'}
          label={'Load More'}
          onClick={onClickLoadMore}
          type="button"
        />
      ) : void 0}
    </div>
);

export default compose(
  withHandlers({
    onClickLoadMore: ({onClickLoadMore, pageInfo}) => () =>
      onClickLoadMore(pageInfo.endCursor)
  }),
)(Repositories);
