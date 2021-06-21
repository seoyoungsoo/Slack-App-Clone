import React, { FC, CSSProperties, useCallback } from 'react';
import { CloseModalButton, CreateMenu } from '@components/Menu/styles';
import { timeStamp } from 'console';

// TS에서 Props들의 타입 설정법
// JS는 ProtoTypes 사용
interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  style: CSSProperties;
  closeButton?: boolean;
}
const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton }) => {
  // 부모에게 이벤트가 전달되지 않음
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};
// Props의 기본 값 설정
Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
