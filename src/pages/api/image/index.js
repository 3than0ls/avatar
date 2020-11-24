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
    id: 4,
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
  const {
    query: { startAfter },
  } = req;
  res.status(200).json(images);
}
