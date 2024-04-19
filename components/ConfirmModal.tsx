interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}>
      <div
        className="modal-content"
        style={{
          backgroundColor: "#FDFDF2",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          height: "30%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid red",
          gap: "20px",
        }}>
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-lg">{message}</p>
        <div
          style={{
            display: "flex",

            width: "50%",
            justifyContent: "center",
            gap: "30px",
          }}>
          <button
            onClick={onConfirm}
            style={{
              marginRight: "10px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}>
            Yes
          </button>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
