import {
  ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective,
  ResourceDirective, TimelineMonth, Inject, EventSettingsModel, GroupModel
} from '@syncfusion/ej2-react-schedule';
import './App.css'

const App = () => {
  const eventSettings: EventSettingsModel = { dataSource: generateStaticEvents(new Date(2024, 4, 1), 10, 12) };
  const group: GroupModel = { resources: ['Resources'] };
  return (
    <ScheduleComponent cssClass='virtual-scrolling' width='100%' height='100vh' selectedDate={new Date(2024, 4, 1)}
      eventSettings={eventSettings} group={group} >
      <ResourcesDirective>
        <ResourceDirective field='ResourceId' title='Resource' name='Resources'
          dataSource={generateResourceData(1, 300, 'Resource')} textField='Text' idField='Id' colorField='Color' />
      </ResourcesDirective>
      <ViewsDirective>
        <ViewDirective option='TimelineMonth' allowVirtualScrolling={true} />
      </ViewsDirective>
      < Inject services={[TimelineMonth]} />
    </ScheduleComponent>
  );
};
export default App;

const generateStaticEvents = (start: Date, resCount: number, overlapCount: number): Object[] => {
  let data: Object[] = [];
  let id: number = 1;
  for (let i: number = 0; i < resCount; i++) {
    let randomCollection: number[] = [];
    let random: number = 0;
    for (let j: number = 0; j < overlapCount; j++) {
      random = Math.floor(Math.random() * (30));
      random = (random === 0) ? 1 : random;
      if (randomCollection.indexOf(random) !== -1 || randomCollection.indexOf(random + 2) !== -1 ||
        randomCollection.indexOf(random - 2) !== -1) {
        random += (Math.max.apply(null, randomCollection) + 10);
      }
      for (let k: number = 1; k <= 2; k++) {
        randomCollection.push(random + k);
      }
      let startDate: Date = new Date(start.getFullYear(), start.getMonth(), random);
      startDate = new Date(startDate.getTime() + (((random % 10) * 10) * (1000 * 60)));
      let endDate: Date = new Date(startDate.getTime() + ((1440 + 30) * (1000 * 60)));
      data.push({
        Id: id,
        Subject: 'Event #' + id,
        StartTime: startDate,
        EndTime: endDate,
        IsAllDay: (id % 10) ? false : true,
        ResourceId: i + 1
      });
      id++;
    }
  }
  return data;
};

const generateResourceData = (startId: number, endId: number, text: string): Object[] => {
  let data: { [key: string]: Object }[] = [];
  let colors: string[] = [
    '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
    '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
    '#fec200', '#5978ee', '#00bdae', '#ea80fc'
  ];
  for (let a: number = startId; a <= endId; a++) {
    let n: number = Math.floor(Math.random() * colors.length);
    data.push({
      Id: a,
      Text: text + ' ' + a,
      Color: colors[n]
    });
  }
  return data;
};