import logoImage from './logo (2).png';

function Logo({ size = 40, spin = false }) {
  return (
    <img
      src={logoImage}
      alt="Trania Logo"
      width={size}
      height={size}
      className={`trania-logo ${spin ? 'logo-spin' : ''}`}
      style={{ display: 'block' }}
    />
  );
}

export default Logo;

