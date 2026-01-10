import "./Banner.css";
type BannerProps = {
  title: string;
  subtitle: string;
  buttonText?: string;
  imageUrl: string;
  onButtonClick?: () => void;
};

export default function Banner({
  title = "",
  subtitle = "",
  buttonText = "",
  imageUrl = "",
  onButtonClick,
}: BannerProps) {
  return (
    <section className="banner">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {onButtonClick && <button onClick={onButtonClick}>{buttonText}</button>}
      </div>
      <div className="banner-image">
        <img src={imageUrl} alt="Application banner" />
      </div>
    </section>
  );
}
