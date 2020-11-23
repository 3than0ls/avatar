const images = [
  {
    id: 1,
    src: 'https://picsum.photos/300/300',
    name: 'test',
  },
  {
    id: 2,
    src: 'https://picsum.photos/400/400',
    name: 'test',
  },
  {
    src: 'https://picsum.photos/300/300',
    name: 'test',
  },
  {
    id: 3,
    src: 'https://picsum.photos/300/300',
    name: 'test',
  },
];

export default function handler(req, res) {
  console.log(req.query);
  const {
    query: { startAfter },
  } = req;
  console.log(`accessing images starting from id ${startAfter} from db`);
  res.status(200).json(images);
}
