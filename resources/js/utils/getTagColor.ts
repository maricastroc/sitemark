export function getTagColor(platform: string) {
  console.log(platform);
  switch (platform) {
    case 'Prime Video':
      return 'bg-accent-blue';
    case 'Disney+':
      return 'bg-accent-green';
    case 'max':
      return 'bg-accent-purple';
    case 'Netflix':
      return 'bg-accent-orange';
    case 'Paramount':
      return 'bg-accent-red';
    case 'Apple TV':
      return 'bg-accent-pink';
    default:
      return 'bg-accent-blue';
  }
}
