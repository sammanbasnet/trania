import logoImage from './logo (2).png';

function Logo({ size = 40 }) {
  return (
    <img
      src={logoImage}
      alt="Trania Logo"
      width={size}
      height={size}
      className="trania-logo"
      style={{ display: 'block' }}
    />
  );
}

export default Logo;

