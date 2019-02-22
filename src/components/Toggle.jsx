import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggle } from '../actions';
import getJS from '../selectors/getJS';
import getMode from '../selectors/getMode';
import SVG from './Svg';

const StyledToggle = styled.button`
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.buttonBackground};
  border-radius: 50%;
  color: ${props => props.theme.buttonBackgroundHover};
  cursor: pointer;
  height: 2.5rem;
  margin: 0 0 0 1rem;
  outline: 0;
  width: 2.5rem;

  &:hover {
    background-color: ${props => props.theme.buttonBackground};

    & svg,
    & g {
      fill: ${props => props.theme.buttonColorHover};
    }
  }

  &.active {
    background-color: #e22a23;
    border-color: #e22a23;

    & svg,
    & g {
      fill: ${props => props.theme.buttonColorHover};
    }
  }

  &.light {
    background-color: ${props => props.theme.buttonColorHover};
    border-color: ${props => props.theme.buttonBorderHover};

    & svg,
    & g {
      fill: ${props => props.theme.buttonBorder};
    }

    &:hover {
      & svg,
      & g {
        fill: ${props => props.theme.buttonBorder};
      }
    }
  }
`;

const Toggle = props => {
  const { toggle, control, js, mode } = props;

  let isActive, isLightMode;
  if (control === 'js' && js === 'es6') isActive = 'active';
  if (control === 'mode' && mode === 'light') isActive = 'active';

  if (!isActive && mode === 'light') isLightMode = 'light';

  return (
    <StyledToggle onClick={() => toggle(control)} className={classnames(isActive, isLightMode)}>
      <SVG control={control} />
    </StyledToggle>
  );
};

Toggle.propTypes = {
  toggle: PropTypes.func.isRequired,
  control: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  js: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  js: getJS(state),
  mode: getMode(state)
});

const mapDispatchToProps = dispatch => {
  return { toggle: version => dispatch(toggle(version)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toggle);