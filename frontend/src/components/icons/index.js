import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import TopicIcon from '@mui/icons-material/Topic';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export function loadIcon(iconName) {
  if (iconName === 'ShowChartIcon') return <ShowChartIcon />;
  else if (iconName === 'AddAlarmIcon') return <AddAlarmIcon />;
  else if (iconName === 'TopicIcon') return <TopicIcon />;
  else return <MiscellaneousServicesIcon />;
}
