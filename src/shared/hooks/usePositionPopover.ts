export const usePositionPopover = (trigger: HTMLElement, popover:HTMLElement, isRightAligned: boolean) => {
  const targetRect = trigger.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const margin = 36; // Внутренний отступ страницы по макету

  popover.offsetHeight < 300 ? popover.style.padding = '40px' : popover.style.padding = '60px';
    
  let topPosition = targetRect.height + 20;
  let leftPosition = 0;
  let rightPosition = 0;


  if (viewportWidth < 1440) {
    // 15 и 9 корректировка с учетом полосы прокрутки
    isRightAligned ? rightPosition = -(viewportWidth - targetRect.right) + margin + 15 :
    leftPosition = -targetRect.left + margin;
        
  } else {
    isRightAligned ? rightPosition = -(viewportWidth - targetRect.right) + margin + 9 + (viewportWidth - 1440) / 2 : 
    leftPosition = -targetRect.left - 9 + margin + (viewportWidth - 1440) / 2;
  };
    
  const top = `${topPosition}px`;
  const left = leftPosition ? `${leftPosition}px` : '';
  const right = rightPosition ? `${rightPosition}px` : '';

  return [top, left, right]
}