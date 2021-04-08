import React, {memo} from 'react';
import WYSIWYG from './WYSIWYG';
import Card from './Card';

const selectComponent = (type) => {
  switch(type) {
    case 'page.wywiwig':
      return WYSIWYG;
    case 'page.card':
      return Card;
    default:
      return () => null;
  }
};

const RenderComponents = ({ components }) => {
  return components.map((e, i) => {
    const Component = selectComponent(e.__component);
    return (
      <div key={e.id} style={{ padding: '10px 0'}}>
        <Component {...e} />
      </div>
    );
  });
};

export default memo(RenderComponents);
