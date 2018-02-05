import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Tab, Button, Container } from 'semantic-ui-react';

import Card from '../Card';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 15px auto;
`;

const HomeComponent = ({ popularMoviesInfo, popularTVInfo }) => {
  const renderTabPane = (content) => {
    const displayCards = contentArray =>
      contentArray.map((movie, index) => <Card hidden={index >= 10} key={movie.id} info={movie} />);
    const shouldDisplayContent = (content === undefined);

    return (
      <Tab.Pane loading={shouldDisplayContent}>
        {shouldDisplayContent || <CardContainer>{displayCards(content)}</CardContainer>}
      </Tab.Pane>
    );
  };

  const panes = [
    {
      menuItem: (
        <Button inverted compact size="large" color="blue">
          Popular Movies
        </Button>
      ),
      render: () => renderTabPane(popularMoviesInfo),
    },
    {
      menuItem: (
        <Button inverted compact size="large" color="blue">
          Popular TV Shows
        </Button>
      ),
      render: () => renderTabPane(popularTVInfo),
    },
  ];

  return (
    <Container>
      <Tab
        menu={{ attached: false, secondary: true, widths: 2 }}
        style={{ paddingTop: 80 }}
        panes={panes}
      />
    </Container>
  );
};

HomeComponent.propTypes = {
  popularMoviesInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  popularTVInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default HomeComponent;
