import { Modal, useMantineTheme } from '@mantine/core';
import PostShare from "../PostSide/PostShare/PostShare"

function ShareModal({ modalOpened, setModalopend }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='70%'
      opened={modalOpened}
      onClose={() => setModalopend(false)}
    >
      
      <PostShare/>

    </Modal>
  );
}

export default ShareModal;