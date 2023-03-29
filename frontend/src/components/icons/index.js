import GiteIcon from '@mui/icons-material/Gite';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import TopicIcon from '@mui/icons-material/Topic';

export function loadIcon(iconName) {
    if (iconName === 'GiteIcon')
        return <GiteIcon />
    else if (iconName === 'AddAlarmIcon')
        return <AddAlarmIcon />
    else if (iconName === 'TopicIcon')
        return <TopicIcon />
    else
        return <MiscellaneousServicesIcon />
}