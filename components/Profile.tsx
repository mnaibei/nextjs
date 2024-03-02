import PromptCard from "./PromptCard";

const ProfileComponent = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: {
  name: string;
  desc: string;
  data: any;
  handleEdit: any;
  handleDelete: any;
}) => {
  const user = data[0]?.creator.username;
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="capitalize dark:text-white">{name} Profile</span>
      </h1>
      <p className="desc text-left dark:text-white">{desc}</p>
      <div className="mt-10 prompt_layout mb-6">
        {data?.length > 0 ? (
          data.map((post: any) => (
            <PromptCard
              key={post._id}
              post={post}
              tag={post.tag}
              handleTagClick={[]}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <p className="dark:text-white">No data...</p>
        )}
      </div>
    </section>
  );
};

export default ProfileComponent;
