import {
  HeaderContainer,
  Link,
  Headline,
  HeaderSection,
  HeadLogo
} from './Header.styled';
import logo from 'images/logo.png';

export const Header = () => {
  return (
    <HeaderSection>
      <HeaderContainer>
        <Link to="/">
          <HeadLogo
            src={logo}
            aria-label="Logo"
            loading="lazy"
          />
        </Link>
        <Headline>
          Алгоритм оказания помощи при <span>инсульте в остром периоде</span>
        </Headline>
      </HeaderContainer>
    </HeaderSection>
  );
};
