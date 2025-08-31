import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import Button from '@ui/button/Button';
import styles from './datePicker.module.scss';
import { type DatePickerProps } from './types';
import CustomChevron from './customChevron';

const DatePicker = ({
  selectedDate,
  onSelect,
  onBack,
  onSave
}: DatePickerProps) => (
  <div className={styles.wrapper}>
    <DayPicker
      mode='single'
      selected={selectedDate}
      onSelect={onSelect}
      fixedWeeks
      showOutsideDays
      className={styles.dayPicker}
      classNames={{
        root: styles.container,
        month_caption: styles.row,
        dropdowns: styles.header,
        dropdown_root: styles.dropdowns,
        caption_label: styles.dropdown,
        months_dropdown: styles.monthNames,
        month_grid: styles.calendarField,
        weekdays: styles.weekNames,
        weeks: styles.days,
        day: styles.day,
        day_button: styles.dayButton,
        outside: styles.dayOutside
      }}
      hideNavigation
      captionLayout='dropdown'
      locale={ru}
      modifiersClassNames={{
        selected: styles.selectedDay,
        today: styles.todayDay
      }}
      components={{ Chevron: CustomChevron }}
    />
    <div className={styles.buttons}>
      <Button variant='secondary' onClick={onBack} style={{ width: '125px' }}>
        Отменить
      </Button>
      <Button variant='primary' onClick={onSave} style={{ width: '115px' }}>
        Выбрать
      </Button>
    </div>
  </div>
);

export default DatePicker;
