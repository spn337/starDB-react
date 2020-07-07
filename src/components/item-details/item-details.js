import React from 'react';
import ErrorButton from '../error-button';

import './item-details.css';

const Record = ({ label, item, field, }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
};

export {
  Record
};

export default class ItemDetails extends React.Component {

  state = {
    item: null,
    image: null
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImage !== prevProps.getImage) {
      this.updateItem();
    }
  }

  updateItem = () => {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then(this.onItemLoaded)
      .catch(this.onError);
  };

  onItemLoaded = (item) => {
    this.setState({
      item,
      image: this.props.getImage(item)
    })
  };


  render() {

    const { item, image } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }
    return (
      <div className="item-details card">
        <img className="item-image"
          src={image} />

        <div className="card-body">
          <h4>{item.name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}