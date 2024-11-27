/* eslint-disable react/prop-types */
import NotesSkeleton from "./skeletons/NotesSkeleton";

export default function Loader({ children, loading, type = null }) {
  if (type == "notes" && loading == "pending") {
    return [0, 0, 0, 0, 0].map((el, index) => {
      return <NotesSkeleton key={index} />;
    });
  } else if (type == "notes" && loading == "fulfield") {
    return <>{children}</>;
  } else if (type == "notes" && loading == "rejected") {
    return <>Errooor</>;
  } else {
    switch (loading) {
      case "pending":
        return <div>Loading ...</div>;
      case "fulfield":
        return <>{children}</>;
      case "rejected":
        return <div>Erreur</div>;
    }
  }
}
