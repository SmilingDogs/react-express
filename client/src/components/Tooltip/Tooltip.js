import React, { useState } from 'react';
import './Tooltip.css';

// class Tooltip extends Component {
//   state = {
//     visible: false,
//   }

//   show = () => {
//     this.setVisibility(true);
//   }

//   hide = () => {
//     this.setVisibility(false);
//   }

//   setVisibility = visible => {
//     this.setState({ visible });
//   }

//   render() {
//     const { visible } = this.state;
//     const { children, content = 'Default Tooltip Content', style = {}, position = 'top' } = this.props;

// return (
//   <span className="tooltipWrapper">
//     { visible && <span style={style} className={`tooltip ${position}`}>{content}</span> }
//     <span
//       className="targetElement"
//       onMouseEnter={this.show}
//       onMouseLeave={this.hide}
//     >{children}</span>
//   </span>
// );
//   }
// }

// export default Tooltip

function ToolTip({
  children,
  content = 'Default Tooltip Content',
  style = {},
  position = 'top',
}) {
  const [visible, setVisible] = useState(false);

  const hide = () => setVisible(false);

  const show = () => setVisible(true);

  return (
    <span className='tooltipWrapper'>
      {visible && (
        <span style={style} className={`tooltip ${position}`}>
          {content}
        </span>
      )}
      <span className='targetElement'
        onMouseEnter={show}
        onMouseLeave={hide}>
        {children}
      </span>
    </span>
  );
}

export default ToolTip;
