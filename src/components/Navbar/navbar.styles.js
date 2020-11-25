import tw from 'twin.macro';
import styled from 'styled-components';
import Button from '../Button/Button';

const Container = styled.div`
  height: 100px;
`;

const Navbar = styled.div`
  ${tw`w-full bg-black flex justify-between items-center px-32 fixed top-0 z-30`}
  height: 100px;
  max-height: ${(props) => (props.minimized ? '70px' : '100px')};
  transition: max-height 0.3s ${(props) => (props.minimized ? 'ease-out' : 'ease-in')};
`;

const ImgContainer = tw.a`
  flex items-center h-full
`;

const LogoImg = styled.img`
  ${tw`py-3 object-contain hover:cursor-pointer`}
  height: ${(props) => (props.minimized ? '60px' : '80px')};
  transition: height 0.3s;
`;

const NavbarButtons = tw.div`
  flex items-center w-64
`;

const UserButton = tw(Button)`
	flex items-center rounded-lg p-1 bg-gray-800
`;

const ButtonText = tw.div`mx-3`;

const Avatar = tw.img`
	ml-8 w-12 h-12 object-cover rounded-lg
`;

export default { Navbar, NavbarButtons, Container, LogoImg, ImgContainer, UserButton, Avatar, ButtonText };
