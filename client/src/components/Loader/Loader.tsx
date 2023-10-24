import LoaderStyles from './Loader.module.css';

export const Loading = () => {
  return (
    <div className={LoaderStyles.loading}>
      <strong>Loading</strong>
      <div className={LoaderStyles["loading-dots"]}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}