/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';

import { getImage } from '../../utils/api';

const Container = styled.div`
  display: ${(props) => (props.hidden ? 'none' : 'block')};
  margin: 20px;
  max-width: 230px;
  transition: 1.5s;

  &:hover {
    max-width: 235px;
  }
`;

const Rating = styled.span`
  position: absolute;
  color: white;
  float: right;
  top: 90%;
  left: 75%;
  font-weight: 800;
  font-size: 19px;
  text-align: center;

  .icon {
    margin-right: 0;
  }
`;

const Title = styled.span`
  position: absolute;
  color: white;
  top: 90%;
  padding-left: 7px;
  font-weight: 800;
  font-size: 19px;
  text-align: center;
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 0.5%;
  border: 0;
  background-color: transparent;
  left: calc(96% - 23px);
  z-index: 3;
  cursor: pointer;
`;

const CenteredIcon = styled.div`
  position: absolute;
  top: 50%;
  left: calc(50% - 2em);
  z-index: 3;
`;

class CardInfo extends Component {
  state = {
    isHovering: false,
  };

  onRemoveButtonClick = (evt) => {
    const { removeButtonHandler, objKey } = this.props;
    evt.preventDefault();
    // functions passed as props on Whatlist component
    removeButtonHandler(objKey);
  };

  onHoverHandler = () => {
    this.setState({
      isHovering: true,
    });
  };

  outHoverHandler = () => {
    this.setState({
      isHovering: false,
    });
  };

  /**
   * @description - will truncate a string that has more than x digits.
   * @param {string} str - the string to be truncated
   * @param {number} len - the length that a string should have (at least) to be truncated
   * @returns {string} - the truncated string (if it's length is bigger than the len param)
   * @memberof CardInfo
   */
  truncateString = (str, len) => {
    if (str.length > len) {
      return `${str.substr(0, len)}...`;
    }

    return str;
  };

  render() {
    const { hidden, showRemoveButton } = this.props;
    const { isHovering } = this.state;
    const {
      title, name, poster_path, type, id, vote_average,
    } = this.props.info;

    const displayTitleOrName = title ? this.truncateString(title, 16) : this.truncateString(name, 16);
    const conditionalStyles = {
      imageHovering: isHovering ? { filter: 'brightness(20%)', transition: '.3s' } : null,
      hidden: isHovering ? null : { visibility: 'hidden' },
    };

    return (
      <Container hidden={hidden}>
        <Link to={`/details/${type}/${id}`}>
          <Card
            onMouseOver={this.onHoverHandler}
            onMouseOut={this.outHoverHandler}
            style={{ transition: '.2s', position: 'relative' }}
          >
            <Image
              size="medium"
              centered
              src={getImage(poster_path, 300)}
              style={conditionalStyles.imageHovering}
            />
            <div style={conditionalStyles.hidden}>
              {showRemoveButton && (
                <RemoveBtn onClick={this.onRemoveButtonClick}>
                  <img
                    src="https://png.icons8.com/material/50/ffffff/delete-sign.png"
                    alt="Close button"
                    width={25}
                  />
                </RemoveBtn>
              )}
              <CenteredIcon>
                <Icon size="huge" style={{ color: '#fff', lineHeight: 0 }} name="zoom" />
              </CenteredIcon>
              <Rating>
                <Icon color="yellow" name="star" />
                {vote_average.toFixed(1)}
              </Rating>
              <Title>
                {displayTitleOrName}
              </Title>
            </div>
          </Card>
        </Link>
      </Container>
    );
  }
}

CardInfo.defaultProps = {
  hidden: false,
  showRemoveButton: false,
  objKey: undefined,
  removeButtonHandler: undefined,
};

CardInfo.propTypes = {
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  hidden: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
  objKey: PropTypes.string,
  removeButtonHandler: PropTypes.func,
};

export default CardInfo;
