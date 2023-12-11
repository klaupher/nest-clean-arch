import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from './env-config.service';
import { EnvConfigModule } from './env-config.module';

describe('EnvConfigService', () => {
  let service: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile();

    service = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be define Port number', () => {
    expect(service.getAppPort()).toBe(3000);
  });

  it('should be define Port number', () => {
    expect(service.getNodeEnv()).toBe('test');
  });
});
