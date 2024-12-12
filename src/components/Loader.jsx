/* eslint-disable react/prop-types */
import NotesSkeleton from "./skeletons/NotesSkeleton";

export default function Loader({ children, loading, type = null }) {
  if (type == "notes" && loading == "pending") {
    return [0, 0, 0, 0, 0].map((el, index) => {
      return (
        <tr className="skeleton h-5 bg-white border-b dark:bg-[#353535] dark:border-gray-700 hover:bg-[#5b5b5b]" key={index}>
          {" "}
          <NotesSkeleton />
        </tr>
      );
    });
  } else if (type == "notes" && loading == "fulfield") {
    return <>{children}</>;
  } else if (type == "notes" && loading == "rejected") {
    return <>{children}</>;
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
