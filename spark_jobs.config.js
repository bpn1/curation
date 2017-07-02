module.exports = {
  VersionRestore: {
    jobName: 'de.hpi.ingestion.versioncontrol.VersionRestore',
    argumentCount: 1,
    argumentTypes: ['uuid']
  },
  VersionDiff: {
    jobName: 'de.hpi.ingestion.versioncontrol.VersionDiff',
    argumentCount: 2,
    argumentTypes: ['uuid', 'uuid']
  }
};
