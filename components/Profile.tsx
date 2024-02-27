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
  console.log(data);
  const user = data[0]?.creator.username;
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="capitalize">{user} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
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
          <p>Loading...</p> // Replace this with your placeholder content
        )}
      </div>
    </section>
  );
};

export default ProfileComponent;
